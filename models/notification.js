import create from './model.js'

export default create("notifications", {
    id: Number,
    date: Date,
    is_read: Boolean,
    content: String,
    link: String
})