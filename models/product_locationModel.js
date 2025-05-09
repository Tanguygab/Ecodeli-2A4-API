const mongoose = require('mongoose');

const product_locationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_location', product_locationSchema);
