const router = require("express").Router();
const controller = require("./controller");


router.get(
    "/category/:slug",
    controller.productListInCategory
)

router.get(
    "/author/:slug",
    controller.productListInAuthor
)

module.exports = router;
