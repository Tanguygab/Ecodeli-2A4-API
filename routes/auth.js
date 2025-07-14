import Router from 'express'
const router = Router()
import User, { simpleUser } from '../models/user.js'
import Role from '../models/role.js'
import Subscription from '../models/subscription.js'
import { compare, genSalt, hash } from 'bcryptjs'
import { error, getLastId, validToken, invalidString } from '../utils.js'

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate("role").populate("subscription")
        if (user === null || !await compare(req.body.password, user.password)) {
            error(res, "invalid-credentials")
            return
        }
        const salt = await genSalt()
        const token = await hash(req.body.email + req.body.password + Date.now(), salt)
        
        await User.updateOne({ _id: user._id }, { token: token }, {})
        res.json({ token: token, user: simpleUser(user) })
    } catch (err) {
        console.error('Login error:', err);
        error(res, "login-failed", 500)
    }
})

router.post('/logout', async (req, res) => {
    const user = await validToken(req, res)
    if (user === null) return
    
    try {
        await User.updateOne({ _id: user._id }, { token: null })
        res.json()
    } catch (err) {
        console.error('Logout error:', err);
        error(res, "logout-failed", 500)
    }
})

router.post('/valid', async (req, res) => {
    const user = await validToken(req, res)
    if (user !== null) res.json({user: simpleUser(user)})
})

router.post('/register', async (req, res) => {
    try {
        const email = req.body.email
        const firstname = req.body.firstname
        const name = req.body.name
        const birthday = req.body.birthday
        let password = req.body.password
        
        if (invalidString(email) || invalidString(firstname) || invalidString(name) || invalidString(password)) {
            error(res, "invalid-credentials")
            return
        }
        
        const existingUser = await User.findOne({ email: email })
        if (existingUser !== null) {
            error(res, "email-already-exist")
            return
        }
        
        const salt = await genSalt()
        password = await hash(password, salt)

        // Récupérer le rôle "user" et l'abonnement "free"
        const userRole = await Role.findOne({ name: "user" })
        const freeSubscription = await Subscription.findOne({ name: "free" })
        
        if (!userRole || !freeSubscription) {
            error(res, "missing-default-data")
            return
        }

        const newUserId = await getLastId(User) + 1
        const newUser = await User.create({
            _id: newUserId,
            firstname: firstname,
            name: name,
            email: email,
            password: password,
            join_date: new Date(),
            birthday: new Date(birthday),
            description: "",
            tutorial: false,
            approved: false,
            role: userRole._id,
            subscription: freeSubscription._id
        })
        
        res.json({ message: "Registration successful", userId: newUser._id })
    } catch (err) {
        console.error('Registration error:', err);
        error(res, "registration-failed", 500)
    }
})
export default router;