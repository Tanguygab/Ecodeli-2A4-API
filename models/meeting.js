import create from './model.js'

export default create("meetings", {
    _id: Number,
    date: Date,
    client: {type: Number, ref: "users"},
    service_provider: {type: Number, ref: "users"},
    accepted: Boolean
})