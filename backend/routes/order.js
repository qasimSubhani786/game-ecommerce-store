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
  read,
  readSingleOrder,
  create,
  updateOrderStatus,
  remove,
  readMyOrders,
} = require("../controllers/order");

// routes
router.get("/orders", read);
router.get("/:id", readSingleOrder);
router.post("/create", requireSignin, authMiddleware, create);
router.put(
  "/update/:id",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);
router.delete(
  "/delete/:id",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  remove
);
router.get("/myorders", requireSignin, authMiddleware, readMyOrders);

module.exports = router;
