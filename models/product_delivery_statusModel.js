const mongoose = require('mongoose');

const product_delivery_statusSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product_delivery_status', product_delivery_statusSchema);
