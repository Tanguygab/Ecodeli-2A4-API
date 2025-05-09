const mongoose = require('mongoose');

const permanent_reduction_package_sizeSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Permanent_reduction_package_size', permanent_reduction_package_sizeSchema);
