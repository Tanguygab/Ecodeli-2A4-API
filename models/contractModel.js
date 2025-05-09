const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
