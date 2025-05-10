import create from './model.js'

export default create("locations", {
    id: Number,
    user: {type: Number, ref: "users"},
    city: String,
    zipcode: String,
    address: String
})