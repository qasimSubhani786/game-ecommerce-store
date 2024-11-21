const User = require("../models/user");
const crypto = require("crypto");

exports.read = (req, res) => {
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
  });
};
const encryptPassword = async (password, salt) => {
  if (!password) {
    return "";
  }
  try {
    const hashPwd = crypto
      .createHmac("sha1", salt)
      .update(password)
      .digest("hex");
    console.log("numan 's password", hashPwd);
    return hashPwd;
  } catch (err) {
    return "";
  }
};

exports.update = (req, res) => {
  const { name, password } = req.body;
  switch (true) {
    case password:
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
      break;
  }
  console.log(password);
  User.findById({ _id: req.user._id }, (err, updated) => {
    if (err) {
      return res.status(400).json({
        error: "Could not find user to update",
      });
    }
    updated.name = name;
    updated.password = password;
    //updated.hashed_password = encryptPassword(password, updated.salt);
    updated.save((err, resp) => {
      if (err) {
        return res.status(400).json({
          error: "Could not find user to update",
        });
      }
      console.log("Profile updated");
    });
    console.log(updated);
    res.json(updated);
  });
};
//get all users
exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//--------------------------User blacklist------------------------------
exports.blacklist = async (req, res) => {
  try {
    const val = req.query.value;
    const { id } = req.body;
    console.log(val, id);
    if (val == "true") {
      console.log("true");
      await User.findByIdAndUpdate(id, { isBlackListed: true });
      res.status(200).json("Successfully updated");
    } else if (val == "false") {
      console.log("false");
      await User.findByIdAndUpdate(id, { isBlackListed: false });
      res.status(200).json("Successfully updated");
    }
  } catch (e) {
    console.log(e);
    res.send("error");
  }
};
