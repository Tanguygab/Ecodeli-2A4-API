import create from './model.js'

export default create("product_requests", {
    _id: Number,
    creation_date: Date,
    date: Date,
    accepted_date: Date,
    validation_code: String,
    delivery_location: {type: Number, ref: "locations"},
    receiver: {type: Number, ref: "users"},
    product: {type: Number, ref: "products"},
    amount: Number,
    delivery: {type: Number, ref: "deliveries"},
    delivery_status: {type: Number, ref: "deliveryStatuses"},
    back_to_ware_house: {type: Number, ref: "warehouses"}
})