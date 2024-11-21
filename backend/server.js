const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();

//db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");
const orderRoutes = require("./routes/order");
const complainRoutes = require("./routes/complain");

//app-middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.urlencoded({ extended: true }));

//middlewares
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/complain", complainRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
