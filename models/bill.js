import create from './model.js'

export default create("bills", {
    id: Number,
    buyer: {type: Number, ref: "users"},
    receiver: {type: Number, ref: "users"},
    date: Date,
    price: Number,
    filepath: String
})