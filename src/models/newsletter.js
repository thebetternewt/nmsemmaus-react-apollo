const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Newsletter',
  new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true
      },
      body: {
        type: String,
        required: true
      },
      publishedOn: {
        type: String,
        required: true
      },
      documentLink: {
        type: String
      }
    },
    {
      timestamps: true
    }
  )
);
