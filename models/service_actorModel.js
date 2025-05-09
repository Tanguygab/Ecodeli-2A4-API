const mongoose = require('mongoose');

const service_actorSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Service_actor', service_actorSchema);
