const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "game",
      },
    ],
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    price: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
  },

  { timestamps: true }
);
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
