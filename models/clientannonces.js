import create from './model.js'
// Rendre date et location optionnels
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
        required: false, // Changé de true à false
        default: Date.now
    },
    location: {
        type: String,
        required: false, // Changé de true à false
        default: 'Non spécifié'
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
