const mongoose = require('mongoose');

const service_providerSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Service_provider', service_providerSchema);
