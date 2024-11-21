const express = require("express");
const router = express.Router();

//fav
const {
  userFav,
  getStats,
  myorders,
  predict,
  Image,
} = require("../controllers/favourite");

// import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
  confirmation,
} = require("../controllers/auth");
// import validator

// import controllers
const {
  read,
  update,
  users,
  profile,
  blacklist,
} = require("../controllers/user");

// routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);
router.put("/update", requireSignin, authMiddleware, update);
router.get("/users", requireSignin, authMiddleware, adminMiddleware, users);
router.get("/profile", requireSignin, authMiddleware, profile);
router.get("/confirmation/:token", confirmation);
router.post(
  "/blacklist",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  blacklist
);
router.get("/fav", requireSignin, authMiddleware, userFav);
router.get(
  "/getStats",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  getStats
);
router.get("/myorders", requireSignin, authMiddleware, myorders);
router.post("/predict", requireSignin, authMiddleware, Image, predict);

module.exports = router;
