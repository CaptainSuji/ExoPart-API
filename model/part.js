const mongoose = require('mongoose');

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      required: true,
      min: 0,
    },
    partNumber: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, // URL to an external image storage
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Part = mongoose.model('Part', partSchema);

module.exports = Part;