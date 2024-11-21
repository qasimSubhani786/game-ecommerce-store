const Order = require("../models/order.js");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51K8lJeSGkXsHpk6s5rnSzxHsShc9bYWdupt7krPVubHYS06G8zhZj2dyA208tSj86k3RKKsHc3meQsdohlq5V7Po004oYO8LpQ"
);

//-----------------------------------------Order Crud-----------------------------------------
//get all orders
exports.read = (req, res) => {
  Order.find({})
    .populate("orderedBy", "name email")
    .populate("games", "Title")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(orders);
    });
};

//get single order
exports.readSingleOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .populate("orderedBy", "name email")
    .populate("games", "Title")
    .exec((err, order) => {
      console.log(order);
      if (err) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(order);
    });
};
//get my orders
exports.readMyOrders = (req, res) => {
  console.log("=>asas", req.user._id);
  Order.find({ orderedBy: req.params._id })
    .populate("orderedBy", "_id name")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Error occured",
        });
      }
      res.json(orders);
    });
};

//create order simple
// exports.create = (req, res) => {
//   const orderedBy = req.user._id;
//   const { games, date, price, transactionId } = req.body;
//   let order = new Order({ games, date, price, orderedBy, transactionId });

//   order.save((err, order) => {
//     if (err) {
//       console.log("SAVE ORDER ERROR", err);
//       return res.status(400).json({
//         error: "Duplicate order. Try another name",
//       });
//     }
//     res.json(order);
//   });
// };
exports.create = async (req, res) => {
  const { token } = req.body;
  const orderedBy = req.user._id;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: req.body.price * 100,
        currency: "pkr",
        customer: customer.id,
        receipt_email: token.email,
        description: "Software development services",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      // req.body.transactionId = payment.source.id;
      const { games, date, price } = req.body;
      const newbooking = new Order({
        games,
        date,
        price,
        transactionId: payment.source.id,
        orderedBy: req.user._id,
      });
      await newbooking.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
    //----------------------------------------------------------------------------
    // const orderedBy = req.user._id;
    // const { games, date, price } = req.body;
    // let order = new Order({ games, date, price, orderedBy, transactionId });

    // order.save((err, order) => {
    //   if (err) {
    //     console.log("SAVE ORDER ERROR", err);
    //     return res.status(400).json({
    //       error: "Duplicate order. Try another name",
    //     });
    //   }
    //   res.json(order);
    // });
  } catch (err) {
    console.log(err);
  }
};

//update order status
exports.updateOrderStatus = (req, res) => {
  console.log(req.user._id);
  Order.updateOne(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { new: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Order status could not be updated",
        });
      }
      return res.status(201).json({
        success: "Order status updated",
      });
    }
  );
};

//delete order
exports.remove = (req, res) => {
  Order.deleteOne({ _id: req.params.id }).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Order not found",
      });
    }
    res.json({
      message: "Order deleted successfully",
    });
  });
};
