const mongoose = require('mongoose');

const warehouse_locationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Warehouse_location', warehouse_locationSchema);
