const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'User',
  new Schema(
    {
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  )
);
