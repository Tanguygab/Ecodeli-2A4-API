import create from './model.js'

export default create("clientannonces", {
    _id: Number,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    user: {
        type: Number,
        ref: "users",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
