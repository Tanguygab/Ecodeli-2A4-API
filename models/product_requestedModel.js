const mongoose = require('mongoose');

const product_requestedSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_requested', product_requestedSchema);
