const Cart = require("../models/Cart");

module.exports = {
  addProductToCart: async (req, res) => {
    const userId = req.user.id;
    const { productId, totalPrice, quantity, additives } = req.body;

    let count;
    try {
      const existingProduct = await Cart.findOne({
        userId: userId,
        productId: productId,
      });
      count = await Cart.countDocuments({ userId: userId });
      if (existingProduct) {
        existingProduct.totalPrice += totalPrice * quantity;
        existingProduct.quantity += quantity;
        await existingProduct.save();
        return res.status(200).json({ status: true, count: count });
      } else {
        const newCartItem = new Cart({
          userId: userId,
          productId: productId,
          totalPrice: totalPrice,
          additives: additives,
          quantity: quantity,
        });
        await newCartItem.save();
        count = await Cart.countDocuments({ userId: userId });
        return res.status(201).json({ status: true, count: count });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  removeCartItem: async (req, res) => {
    const cartItemId = req.params.id;
    const userId = req.user.id;
    try {
      await Cart.findByIdAndDelete({ _id: cartItemId });
      const count = await Cart.countDocuments({ userId: userId });
      return res.status(200).json({ status: true, count: count });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getCart: async (req, res) => {
    const userId = req.user.id;
    try {
      const cart = await Cart.find({ userId: userId }).populate({
        path: "productId",
        select: "imageUrl title restaurant rating ratingCount ",
        populate: {
          path: "restaurant",
          select: "time coords",
        },
      });
      return res.status(200).json({ status: true, cart: cart });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getCartCount: async (req, res) => {
    const userId = req.user.id;
    try {
      const count = await Cart.countDocuments({ userId: userId });
      return res.status(200).json({ status: true, count: count });
    } catch (error) {
      req.status(500).json({ status: false, message: error.message });
    }
  },
  decrementProductQty: async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    try {
      const cartItem = await Cart.findById(id);
      if (cartItem) {
        const productPrice = cartItem.totalPrice / cartItem.quantity;
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          cartItem.totalPrice -= productPrice;
          await cartItem.save();
          res.status(200).json({
            status: true,
            message: "Product quantity successfully decremented",
          });
        } else {
          await Cart.findOneAndDelete({ _id: id });
          res.status(200).json({
            status: true,
            message: "Product successfully removed from cart",
          });
        }
      } else {
        res.status(400).json({ status: false, message: "Cart item not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
