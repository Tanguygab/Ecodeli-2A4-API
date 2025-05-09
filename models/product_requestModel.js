const mongoose = require('mongoose');

const product_requestSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_request', product_requestSchema);
