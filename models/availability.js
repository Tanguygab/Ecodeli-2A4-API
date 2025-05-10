import create from './model.js'

export default create("availabilities", {
    _id: Number,
    user: {type: Number, ref: "users"},
    from_time: Date,
    to_time: Date
})