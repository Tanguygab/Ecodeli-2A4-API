const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
