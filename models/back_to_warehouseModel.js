const mongoose = require('mongoose');

const back_to_warehouseSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Back_to_warehouse', back_to_warehouseSchema);
