const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: false, default: "none" },
    password: { type: String, required: true },
    verification: { type: Boolean, default: false },
    phone: { type: String, default: "0123456789" },
    phoneVerification: { type: Boolean, default: false },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Client", "Admin", "Vendor", "Driver"],
    },
    profile: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/ecommerceappfl.appspot.com/o/image%2Favatar.jpg?alt=media&token=082f23e5-29e1-4a10-b91a-4c002a8b093a",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
