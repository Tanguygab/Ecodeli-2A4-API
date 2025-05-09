const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
