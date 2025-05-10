import create from './model.js'

export default create("products", {
    id: Number,
    name: String,
    price: Number,
    size: {type: Number, ref: "packageSizes"},
    seller: {type: Number, ref: "users"},
    location: Location
})