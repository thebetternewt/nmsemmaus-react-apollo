const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Pilgrim',
  new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      hometown: {
        type: String,
      },
      sponsor: {
        type: String,
      },
      walkNumber: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
