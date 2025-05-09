const mongoose = require('mongoose');

const product_sizeSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_size', product_sizeSchema);
