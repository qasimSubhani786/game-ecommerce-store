const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    isConfirm: {
      type: Boolean,
      default: true,
    },
    profileImage: {
      type: String,
      default: "user.png",
    },
    DOB: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isBlackListed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      enum: ["Admin", "User", "Modertor"],
      default: "User",
    },
  },
  { timestamps: true }
);

// virtual fields
userSchema
  .virtual("password")
  .set(function (password) {
    // create temp variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods > authenticate, encryptPassword, makeSalt
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
// export user model

module.exports = mongoose.model("user", userSchema);
