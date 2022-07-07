const router = require("express").Router();
const controller = require("./controller");


///////////////////////////////////////////////////////////////
// get category model
router.get(
    "/categories",
    controller.categoryList
)

router.get(
    "/category/:slug",
    controller.productListInCategory
)


///////////////////////////////////////////////////////////////
// get author model
router.get(
    "/authors",
    controller.authorList
)

router.get(
    "/author/:slug",
    controller.productListInAuthor
)

module.exports = router;
