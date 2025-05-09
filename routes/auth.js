import Router from 'express'
const router = Router()
import User, { simpleUser } from '../models/user.js'
import Role from '../models/role.js'
import { compare, genSalt, hash } from 'bcrypt'
import { error, getLastId, validToken, invalidString } from '../utils.js'

router.post('/login', async (req, res) => {
    const user = await (await User.findOne({ email: req.body.email })).populate("role", "id name access_level")
    if (user === null || !await compare(req.body.password, user.password)) {
        error(res, "invalid-credentials")
        return
    }
    const salt = await genSalt()
    const token = await hash(req.body.username + req.body.password, salt)
    console.log(user, simpleUser(user))
    await User.updateOne({ _id: user._id }, { token: token })
    res.json({ token: token, user: simpleUser(user) })
})

router.post('/logout', async (req, res) => {
    const user = await validToken(req, res)
    if (user === null) return
    
    await User.updateOne({ _id: user._id }, { token: null })
    res.json()
})

router.post('/valid', async (req, res) => {
    const user = await validToken(req, res)
    if (user !== null) res.json({user: await user.populate("role", "id name access_level")})
})

router.post('/register', async (req, res) => {
    const email = req.body.email
    const firstname = req.body.firstname
    const name = req.body.name
    const birthday = req.body.birthday
    let password = req.body.password
    if (invalidString(email) || invalidString(firstname) || invalidString(name) || invalidString(password)) {
        error(res, "invalid-credentials")
        return
    }
    const user = await User.findOne({ email: email })
    if (user !== null) {
        error(res, "email-already-exist")
        return
    }
    const salt = await genSalt()
    password = await hash(password, salt)

    await User.create({
        _id: await getLastId(User) + 1,
        firstname: firstname,
        name: name,
        email: email,
        password: password,
        join_date: Date.now(),
        birthday: birthday,
        description: "",
        tutorial: false,
        approved: false,
        role: await Role.findOne({ name: "user" })
    })
    res.json()
})

export default router
