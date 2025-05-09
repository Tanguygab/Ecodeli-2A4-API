const mongoose = require('mongoose');

const product_deliverySchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_delivery', product_deliverySchema);
