const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.get(
    "/", 
    controller.productList
);

router.get(
    "/:slug", 
    controller.productSingle
);

module.exports = router;
