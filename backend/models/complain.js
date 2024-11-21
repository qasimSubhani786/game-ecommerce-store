const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      max: 32,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    description: {
      type: String,
      required: true,
      max: 2000,
    },
    status: {
      type: String,
      enum: ["PENDING", "SOLVED"],
      default: "PENDING",
    },
    Image: {
      type: String,
      default: "complain.png",
    },
  },

  { timestamps: true }
);
const complainModel = mongoose.model("complain", complainSchema);
module.exports = complainModel;
