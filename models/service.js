import create from './model.js'

export default create("services", {
    _id: Number,
    creation_date: Date,
    date: Date,
    name: String,
    image: String,
    description: String,
    price: Number,
    user: {type: Number, ref: "users"},
    actor: {type: Number, ref: "users"}
})