import create from './model.js'

export default create("products", {
    _id: Number,
    name: String,
    price: Number,
    size: {type: Number, ref: "packageSizes"},
    seller: {type: Number, ref: "users"},
    location: {type: Number, ref: "locations"}
})