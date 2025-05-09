const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
