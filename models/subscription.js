import create from './model.js'

export default create("subscriptions", {
    id: Number,
    name: String,
    price: Number,
    assurance_max: Number,
    assurance_bonus: Number,
    first_delivery_free_below: Number,
    delivery_reduction: Number,
    free_delivery_priority_per_month: Number,
    delivery_priority: Number,
    permanent_reduction: Number
})