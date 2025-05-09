import create from './model.js'

export default create("roles", {
    _id: Number,
    name: String,
    access_level: Number
})