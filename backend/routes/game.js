const express = require("express");
const router = express.Router();

// import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
// import validator

// import controllers
const {
  read1,
  read2,
  readSingleGame,
  create,
  update,
  remove,
  Image,
  addReview,
  deleteReview,
  favouriteGame,
} = require("../controllers/game");

// routes
router.get("/games", requireSignin, authMiddleware, read1);
router.get("/gears", requireSignin, authMiddleware, read2);
router.get("/:id", readSingleGame);
router.post(
  "/create",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  Image,
  create
);
router.put(
  "/update/:id",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  update
);
router.delete(
  "/delete/:id",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  remove
);
router.put("/review/:id", requireSignin, authMiddleware, addReview);
router.delete(
  "/review/:id/:reviewId",
  requireSignin,
  authMiddleware,
  deleteReview
);
router.put("/favourite/:id", requireSignin, authMiddleware, favouriteGame);
module.exports = router;
