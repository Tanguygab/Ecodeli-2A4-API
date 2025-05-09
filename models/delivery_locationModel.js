const mongoose = require('mongoose');

const delivery_locationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Delivery_location', delivery_locationSchema);
