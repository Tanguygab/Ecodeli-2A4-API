const mongoose = require('mongoose');

const delivery_statusSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Delivery_status', delivery_statusSchema);
