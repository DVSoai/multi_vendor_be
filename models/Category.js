const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

mongoose.exports = mongoose.model("Category", CategorySchema);
