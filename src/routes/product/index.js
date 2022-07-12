const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");
const {isAuthenticated} = require("./../../middlewares/auth");


// get list of product
router.get(
    "/", 
    controller.productList
);

// get one product by slug
router.get(
    "/:slug", 
    controller.productSingle
);


// add product(book) to order
router.post(
    "/:slug",
    isAuthenticated,
    validator.addProductToCart(),
    controller.validate,
    controller.addProductToCart
);

module.exports = router;
