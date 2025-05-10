import create from './model.js'

export default create("warehouses", {
    _id: Number,
    location: {type: Number, ref: "locations"},
    name: String
})