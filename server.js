const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
dotenv.config();

mongoose
  .connect(process.env.MONGOUrl)
  .then(() => {
    return console.log("Multi Vendor DB Connected");
  })
  .catch((err) => {
    return console.log(err);
  });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server is running on port ${port}`));
