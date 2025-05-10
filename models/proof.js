import create from './model.js'

export default create("proofs", {
    id: Number,
    user: {type: Number, ref: "users"},
    date: Date,
    name: String,
    filepath: String
})