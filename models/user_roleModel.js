const mongoose = require('mongoose');

const user_roleSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_role', user_roleSchema);
