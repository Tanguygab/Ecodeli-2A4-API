const mongoose = require('mongoose');

const bill_buyerSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Bill_buyer', bill_buyerSchema);
