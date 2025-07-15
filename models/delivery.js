import create from './model.js'

export default create("deliveries", {
    _id: Number,
    deliveryman: {type: Number, ref: "users"},
    latitude: Number,
    longitude: Number
})