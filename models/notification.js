import create from './model.js'

export default create("notifications", {
    id: Number,
    user: {type: Number, ref: "users"},
    date: Date,
    is_read: Boolean,
    content: String,
    link: String
})