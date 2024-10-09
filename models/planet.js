const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  hasLife: { type: Boolean, default: false },
});

const Planet = mongoose.model('Planet', planetSchema);
module.exports = Planet;
