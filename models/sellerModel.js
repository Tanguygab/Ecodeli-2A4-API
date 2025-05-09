const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
