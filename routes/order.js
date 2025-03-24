const router = require("express").Router();

const orderController = require("../controllers/orderController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, orderController.placeOrder);

router.get("/", verifyTokenAndAuthorization, orderController.getUserOrders);

module.exports = router;
