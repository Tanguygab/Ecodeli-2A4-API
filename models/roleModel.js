const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
