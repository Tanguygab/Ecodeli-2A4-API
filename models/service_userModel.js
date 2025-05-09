const mongoose = require('mongoose');

const service_userSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Service_user', service_userSchema);
