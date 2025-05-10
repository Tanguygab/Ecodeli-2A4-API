import create from './model.js'

export default create("warehouses", {
    id: Number,
    location: {type: Number, ref: "locations"},
    name: String
})