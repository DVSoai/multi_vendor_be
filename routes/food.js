const router = require("express").Router();

const foodController = require("../controllers/foodController");
const { verifyTokenVendor } = require("../middleware/verifyToken");

router.post("/", verifyTokenVendor, foodController.addFood);
// router.get("/all", foodController.getAllFoods);
router.get("/byCode/:code", foodController.getAllFoodsByCode);
router.get("/recommendation/:code", foodController.getRandomFood);
router.get("/:id", foodController.getFoodById);

router.get("/restaurant-foods/:id", foodController.getFoodsByRestaurant);
router.get("/search/:search", foodController.searchFoods);
router.get(
  "/random/:category/:code",
  foodController.getRandomFoodsByCategoryAndCode
);

router.get("/:category/:code", foodController.getFoodsByCategoryAndCode);

module.exports = router;
