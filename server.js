const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restaurant");
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
app.use("/api/category", CategoryRoute);
app.use("/api/restaurant", RestaurantRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
