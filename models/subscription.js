import create from './model.js'

export default create("subscriptions", {
    _id: Number,
    name: String,
    color: String,
    price: Number,
    assurance_max: Number,
    assurance_bonus: Number,
    first_delivery_free_below: Number,
    delivery_reduction: Number,
    free_delivery_priority_per_month: Number,
    delivery_priority: Number,
    permanent_reduction: Number
})