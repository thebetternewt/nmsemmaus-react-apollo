const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Board',
  new Schema(
    {
      year: {
        type: Number,
        required: true,
        unique: true,
      },
      chairman: {
        type: String,
      },
      viceChairman: {
        type: String,
      },
      secretary: {
        type: String,
      },
      treasurer: {
        type: String,
      },
      communitySpiritualDirector: {
        type: String,
      },
      exOfficio: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);
