const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
