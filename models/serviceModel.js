const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
