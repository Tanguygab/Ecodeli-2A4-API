import create from './model.js'

export default create("postannoucements", {
    _id: Number,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    justificatif: String, // Chemin vers le fichier justificatif
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    submission_date: {
        type: Date,
        default: Date.now
    },
    reviewed_by: {type: Number, ref: "users"}, // Admin qui a traité la demande
    reviewed_date: Date,
    notes: String // Notes de l'admin
})
