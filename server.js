const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restaurant");
const FoodRouter = require("./routes/food");
const RatingRouter = require("./routes/rating");
const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const AddressRoute = require("./routes/address");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");

dotenv.config();

mongoose
  .connect(process.env.MONGOUrl)
  .then(() => {
    return console.log("Multi Vendor DB Connected");
  })
  .catch((err) => {
    return console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/foods", FoodRouter);
app.use("/api/rating", RatingRouter);
app.use("/api/address", AddressRoute);
app.use("/api/cart", CartRoute);
app.use("api/orders", OrderRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
