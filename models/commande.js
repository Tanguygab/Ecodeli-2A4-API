import create from './model.js'

export default create("commandes", {
    _id: Number,
    client: {type: Number, ref: "users"},
    commercant: String,
    description: String,
    montant: Number,
    status: String, // "en_attente", "en_livraison", "livree", "validee", "annulee"
    adresse_livraison: String,
    date_commande: Date,
    date_livraison_souhaitee: Date,
    notes: String
})