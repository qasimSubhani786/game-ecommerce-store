const Game = require("../models/game.js");
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

//-----------------------------------------Game Crud-----------------------------------------
//get all games
exports.read1 = async (req, res) => {
  try {
    const allGames = await Game.find({ type: "GAME" }).populate(
      "reviews.createdBy",
      "name email"
    );
    //append true in allGames where the userId is present in the favourite array
    allGames.forEach((game) => {
      if (game.favourite.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });

    res.status(200).json({ success: "success", data: allGames });
  } catch (err) {
    console.log(err);
  }
};
//get all gears
exports.read2 = async (req, res) => {
  try {
    const allGames = await Game.find({ type: "GEAR" }).populate(
      "reviews.createdBy",
      "name email"
    );
    //append true in allGames where the userId is present in the favourite array
    allGames.forEach((game) => {
      if (game.favourite.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });

    res.status(200).json({ success: "success", data: allGames });
  } catch (err) {
    console.log(err);
  }
};

//get single game
exports.readSingleGame = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .populate("reviews.createdBy", "name email")
    .exec((err, game) => {
      console.log(game);
      if (err) {
        return res.status(400).json({
          error: "Game not found",
        });
      }
      res.json(game);
    });
};

//create game
exports.create = (req, res) => {
  const Image = req.file.filename;
  const {
    Title,
    Description,
    type,
    Platform,
    Publisher,
    ReleaseDate,
    marketPrice,
    costPrice,
    minAge,
    quantity,
  } = req.body;
  const profit = marketPrice - costPrice;
  let game = new Game({
    Title,
    Description,
    type,
    Platform,
    Publisher,
    ReleaseDate,
    marketPrice,
    costPrice,
    minAge,
    quantity,
    profit,
    Image,
  });

  game.save((err, game) => {
    if (err) {
      console.log("SAVE GAME ERROR", err);
      return res.status(400).json({
        error: "Duplicate game. Try another name",
      });
    }
    res.json(game);
  });
};

//update game
exports.update = (req, res) => {
  const {
    Title,
    Description,
    type,
    Platform,
    Publisher,
    ReleaseDate,
    marketPrice,
    costPrice,
    minAge,
    quantity,
  } = req.body;
  const profit = marketPrice - costPrice;
  Game.findOneAndUpdate(
    { _id: req.params.id },
    {
      Title,
      Description,
      type,
      Platform,
      Publisher,
      ReleaseDate,
      marketPrice,
      costPrice,
      minAge,
      quantity,
      profit,
    },
    { new: true }
  ).exec((err, game) => {
    if (err) {
      return res.status(400).json({
        error: "Game not found",
      });
    }
    res.json(game);
  });
};

//delete game
exports.remove = (req, res) => {
  Game.findOneAndDelete({ _id: req.params.id }).exec((err, game) => {
    if (err) {
      return res.status(400).json({
        error: "Game not found",
      });
    }
    res.json({
      message: "Game deleted successfully",
    });
  });
};

// add review to game
exports.addReview = (req, res) => {
  const createdBy = req.user._id;
  let newbody = req.body;
  newbody.createdBy = createdBy;
  Game.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { reviews: newbody } },
    { new: true }
  ).exec((err, game) => {
    if (err) {
      return res.status(400).json({
        error: "Game not found",
      });
    }
    res.json(game);
  });
};

//delete the review
exports.deleteReview = (req, res) => {
  Game.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { reviews: { _id: req.params.reviewId } } },
    { new: true }
  ).exec((err, game) => {
    if (err) {
      return res.status(400).json({
        error: "Game not found",
      });
    }
    res.json(game);
  });
};

//favourite and unfavourite game
exports.favouriteGame = (req, res) => {
  const gameId = req.params.id;
  Game.findById(gameId).exec((err, result) => {
    if (err) {
      return next(new AppError("Could not update like count", 400));
    }
    console.log(result.favourite);
    if (result.favourite && !result.favourite.includes(req.user._id)) {
      //if user has not liked the post. Like it
      Game.findByIdAndUpdate(
        gameId,
        { $push: { favourite: req.user._id } },
        { upsert: true, new: true }
      ).exec((err, result) => {
        if (err) {
          return next(new AppError("Could not update like count", 400));
        }
        res.status(200).json({
          status: "success",
          data: result,
        });
      });
    } else {
      //if user has liked the post. Dislike it
      Game.findByIdAndUpdate(
        gameId,
        { $pull: { favourite: req.user._id } },
        { upsert: true, new: true }
      ).exec((err, result) => {
        if (err) {
          return next(new AppError("Could not update like count", 400));
        }
        res.status(200).json({
          status: "success",
          data: result,
        });
      });
    }
  });
};
