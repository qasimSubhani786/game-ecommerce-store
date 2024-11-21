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
const { Image, create, read, update } = require("../controllers/complain.js");

// routes
router.post("/create", requireSignin, authMiddleware, Image, create);
router.get("/complains", requireSignin, authMiddleware, adminMiddleware, read);
router.put(
  "/update/:id",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  update
);

module.exports = router;
