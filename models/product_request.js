import create from './model.js'

export default create("productRequests", {
    id: Number,
    creation_date: Date,
    date: Date,
    accepted_date: Date,
    validation_code: String,
    delivery_location: Location,
    receiver: {type: Number, ref: "users"},
    product: {type: Number, ref: "products"},
    delivery: {type: Number, ref: "deliveries"},
    delivery_status: {type: Number, ref: "deliveryStatuses"},
    back_to_ware_house: {type: Number, ref: "warehouses"}
})