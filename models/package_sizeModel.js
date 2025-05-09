const mongoose = require('mongoose');

const package_sizeSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Package_size', package_sizeSchema);
