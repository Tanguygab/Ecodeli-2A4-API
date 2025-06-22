import create from './model.js'

export default create("users", {
    _id: Number,
    firstname: String,
    name: String,
    email: String,
    password: String,
    token: String,
    birthday: Date,
    subscription: {type: Number, ref: "subscriptions"},
    description: String,
    join_date: Date,
    tutorial: Boolean,
    approved: Boolean,
    role: {type: Number, ref: "roles"}
})

export function simpleUser(user) {
    return {
        _id: user._id,
        firstname: user.firstname,
        name: user.name,
        email: user.email,
        description: user.description,
        join_date: user.join_date,
        role: user.role
    }
}

export function populateUser(request, field = "user") {
    return request.populate(field, "_id firstname name email description join_date role")
}