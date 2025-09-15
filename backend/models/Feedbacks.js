const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Feedbacks", feedbackSchema);
