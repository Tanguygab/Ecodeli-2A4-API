import create from './model.js'

export default create("prestations", {
    _id: Number,
    client: {type: Number, ref: "users"},
    prestataire: {type: Number, ref: "users"},
    titre: String,
    description: String,
    tarif: Number,
    status: String, // "demandee", "acceptee", "en_cours", "terminee", "annulee"
    date_prestation: Date,
    duree_estimee: Number, // en minutes
    adresse: String,
    notes: String,
    date_creation: Date
})