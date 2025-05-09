const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
