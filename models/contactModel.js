const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'true',
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'please provide a valid email address'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'please provide a phone number'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
