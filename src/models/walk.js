const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Walk',
  new Schema(
    {
      walkNumber: {
        type: Number,
        required: true
      },
      gender: {
        type: String,
        default: 'Men'
      },
      startDate: {
        type: String
      },
      endDate: {
        type: String
      }
    },
    {
      timestamps: true
    }
  )
);
