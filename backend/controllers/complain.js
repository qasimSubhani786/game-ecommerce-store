const Complain = require("../models/complain.js");
const User = require("../models/user.js");
const crypto = require("crypto");

const multer = require("multer");

//------------------------Multer  Configuration------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
exports.Image = upload.single("Image");

//-----------------------------------------Complain Crud-----------------------------------------
//get all complains and populate by createdBy
exports.read = async (req, res) => {
  const complain = await Complain.find().populate("createdBy", "name email");
  if (!complain) {
    return next(new AppError("Could not find any complain", 400));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: complain,
  });
};

//create complain
exports.create = (req, res) => {
  const Image = req.file.filename;
  const createdBy = req.user._id;
  const { order, description, Title } = req.body;
  let complain = new Complain({ createdBy, order, description, Image, Title });

  complain.save((err, complain) => {
    if (err) {
      console.log("SAVE COMPLAIN ERROR", err);
      return res.status(400).json({
        error: "Duplicate complain. Try another name",
      });
    }
    res.json(complain);
  });
};
//update complain status
exports.update = (req, res) => {
  Complain.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { new: true },
    (err, complain) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      res.json(complain);
    }
  );
};
