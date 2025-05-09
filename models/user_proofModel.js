const mongoose = require('mongoose');

const user_proofSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_proof', user_proofSchema);
