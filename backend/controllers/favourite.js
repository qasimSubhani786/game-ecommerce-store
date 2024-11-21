const Game = require("../models/game.js");
const User = require("../models/user.js");
const Order = require("../models/order.js");
const Complain = require("../models/complain.js");
const multer = require("multer");

const fs = require("fs");

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

//get all games where userId is in favourites array
exports.userFav = async (req, res) => {
  try {
    const allGames = await Game.find({ favourite: req.user._id }).populate(
      "reviews.createdBy",
      "name email"
    );
    //append true in allGames where the userId is present in the favourite array
    allGames.forEach((game) => {
      if (game.favourite.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });
    res.status(200).json({ allGames });
  } catch (err) {
    console.log(err);
  }
};

//give total number of users
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const gameCount = await Game.countDocuments({ type: "GAME" });
    const gearCount = await Game.countDocuments({ type: "GEAR" });
    const orderCount = await Order.countDocuments({});
    const complainCount = await Complain.countDocuments({});
    //total price of all orders
    const game = await Order.find({});
    let totalRevenue = 0;
    game.forEach((element) => {
      totalRevenue += element.price;
    });
    //order count of pending status
    const pendingOrder = await Order.countDocuments({ status: "PENDING" });
    const deliveredOrder = await Order.countDocuments({ status: "DELIVERED" });
    res.json({
      userCount: userCount,
      gameCount: gameCount,
      orderCount: orderCount,
      complainCount: complainCount,
      totalRevenue: totalRevenue,
      gearCount: gearCount,
      pendingOrder: pendingOrder,
      deliveredOrder: deliveredOrder,
    });
  } catch (err) {
    console.log(err);
  }
};
//get all orders of loggedin user
exports.myorders = (req, res) => {
  console.log(req.user._id);
  Order.find({ orderedBy: req.user._id })
    .populate("games", "Title")
    .populate("orderedBy", "name email")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Orders not found",
        });
      }
      res.json(orders);
    });
};
//get age prediction
exports.predict = async (req, res) => {
  const name = req.file.filename;
  async function query(filename) {
    const data = fs.readFileSync("./Images/" + name);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/nateraw/vit-age-classifier",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: data,
      }
    );
    const result = await response.json();
    let output = result[0];
    console.log(output);
    if (output.label == "more than 70") {
      return res.json(70 + Math.floor(Math.random() * 10));
    } else if (output.label == "50-59") {
      return res.json(50 + Math.floor(Math.random() * 10));
    } else if (output.label == "40-49") {
      return res.json(40 + Math.floor(Math.random() * 10));
    } else if (output.label == "60-69") {
      return res.json(60 + Math.floor(Math.random() * 10));
    } else if (output.label == "30-39") {
      return res.json(30 + Math.floor(Math.random() * 10));
    } else if (output.label == "20-29") {
      return res.json(20 + Math.floor(Math.random() * 10));
    } else if (output.label == "10-19") {
      return res.json(10 + Math.floor(Math.random() * 10));
    } else if (output.label == "0-9") {
      return res.json(0 + Math.floor(Math.random() * 10));
    }
  }

  query("test.jpg").then((response) => {
    console.log("Done!");
  });
};
