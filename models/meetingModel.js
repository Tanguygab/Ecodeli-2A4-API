const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
