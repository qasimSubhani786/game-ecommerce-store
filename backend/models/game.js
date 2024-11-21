const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      max: 32,
    },
    Description: {
      type: String,
      required: true,
      max: 2000,
    },
    type: {
      type: String,
      enum: ["GAME", "GEAR"],
      default: "GAME",
    },
    profit: {
      type: Number,
      default: 0,
    },
    Platform: {
      type: String,
      enum: ["PS4", "PS5", "XBOX", "PC"],
      required: true,
      max: 32,
    },
    Publisher: {
      type: String,
      required: true,
      max: 32,
    },
    ReleaseDate: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      default: "game.png",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    marketPrice: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    minAge: {
      type: Number,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    //favourite
    favourite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    //array of reviews
    reviews: [
      {
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        comment: {
          type: String,
          trim: true,
          required: [true, "Review can't be empty!"],
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: [true, "Please provide some ratings!"],
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },

  { timestamps: true }
);
const gameModel = mongoose.model("game", gameSchema);
module.exports = gameModel;
