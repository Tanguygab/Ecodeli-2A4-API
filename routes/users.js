import { Router } from 'express';
import User from '../models/user.js';
import { error, getLastId, validToken } from '../utils.js'
import { genSalt, hash } from 'bcryptjs'
import multer from 'multer'
const router = Router();

const upload = multer({
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
  storage: multer.diskStorage({
    destination: 'public/data/images/',
    filename: (req, file, cb) => cb(null, new Date().getTime() + "." + file.mimetype.substring(6))
  })
});

router.get('/', async (req, res) => {
  const items = await User.find({}, "_id firstname name image email description join_date role");
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await User.findOne({ _id: req.params.id })
    .populate('subscription')
    .populate('role');
  if (!item) {
    error(res, 'user.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', upload.single('image'), async (req, res) => {
  const newId = await getLastId(User) + 1;
  const userData = { _id: newId, ...req.body };
  
  // Ajouter l'image si elle est fournie
  if (req.file) {
    userData.image = req.file.filename;
  }
  
  const item = await User.create(userData);
  res.json(item);
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  if (user.role.name !== 'admin' && user.id !== req.params.id) {
    error(res, 'no-permission', 404);
    return
  }

  if (await User.findOne({
    _id: { $ne: user._id },
    email: req.body.email
  })) {
    error(res, 'email.already-used', 404);
    return
  }

  const updateFields = {
    firstname: req.body.firstname,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    birthday: req.body.birthday,
    tutorial: req.body.tutorial === 'true' || req.body.tutorial === true,
    notifications: req.body.notifications === 'true' || req.body.notifications === true,
  }
  
  // Ajouter l'image si elle est fournie
  if (req.file) {
    updateFields.image = req.file.filename
  }

  const item = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateFields },
    { new: true }
  )
  res.json(item);
});

router.put('/:id/password', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  if (user.role.name !== 'admin' && user.id !== req.params.id) {
    error(res, 'no-permission', 404);
    return
  }

  let email = user.email;
  if (user.id !== req.params.id) {
    email = (await User.findOne({_id: req.params.id}, "email")).email
  }

  const salt = await genSalt()
  const password = await hash(req.body.password, salt)
  const token = await hash(email + req.body.password + Date.now(), salt);

  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        password: password,
        token: token
      }
    },
  )
  res.json(token);
});

router.delete('/:id', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  if (user.role.name !== 'admin' && user.id !== req.params.id) {
    error(res, 'no-permission', 404);
    return
  }

  const item = await User.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'user.not-found', 404);
    return;
  }
  res.json();
});

export default router;
