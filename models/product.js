import create from './model.js'

export default create("products", {
    _id: Number,
    name: String,
    price: Number,
    size: {type: Number, ref: "package_sizes"},
    seller: {type: Number, ref: "users"},
    location: {type: Number, ref: "locations"}
})