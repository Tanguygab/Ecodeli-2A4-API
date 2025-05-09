const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Proof', proofSchema);
