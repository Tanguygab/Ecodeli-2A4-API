const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
