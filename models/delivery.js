import create from './model.js'

export default create("deliveries", {
    id: Number,
    deliveryman: {type: Number, ref: "users"},
    latitude: Number,
    longitude: Number,
    products: Number
})