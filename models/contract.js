import create from './model.js'

export default create("contracts", {
    id: Number,
    user: {type: Number, ref: "users"},
    start_date: Date,
    end_date: Date,
    filepath: String
})