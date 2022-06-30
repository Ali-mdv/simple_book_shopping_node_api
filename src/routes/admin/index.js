const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");


///////////////////////////////////////////////////////////////
// get-update-delete user model
router.get(
    "/users",
    controller.getUserList
);

router.get(
    "/user/:id",
    controller.getUserSingle
);

router.put(
    "/user/:id",
    validator.updateUser(),
    controller.validate,
    controller.updateUserSingle
);

router.delete(
    "/user/:id",
    controller.deleteUserSingle
)


///////////////////////////////////////////////////////////////
// get-create-update-delete author model
router.get(
    "/authors",
    controller.getAuthorList
);

router.get(
    "/author/:slug",
    controller.getAuthorSingle
);


router.post(
    "/author/create",
    validator.createAuthor(),
    controller.validate,
    controller.createAuthor
);

router.put(
    "/author/:slug",
    validator.createAuthor(),
    controller.validate,
    controller.updateAuthor
);

router.delete(
    "/author/:slug",
    controller.deleteAuthor
)


///////////////////////////////////////////////////////////////
// get-create-update-delete category model
router.get(
    "/categories",
    controller.getCategoryList
);

router.get(
    "/category/:slug",
    controller.getCategorySingle
);


router.post(
    "/category/create",
    validator.createCategory(),
    controller.validate,
    controller.createCategory
);

router.put(
    "/category/:slug",
    validator.updateCategory(),
    controller.validate,
    controller.updateCategory
);

router.delete(
    "/category/:slug",
    controller.deleteCategory
)


///////////////////////////////////////////////////////////////
// get-create-update-delete book model
router.get(
    "/books",
    controller.getBookList
);

router.get(
    "/book/:slug",
    controller.getBookSingle
);


router.post(
    "/book/create",
    validator.createBook(),
    controller.validate,
    controller.createBook
);

router.put(
    "/book/:slug",
    validator.updateBook(),
    controller.validate,
    controller.updateBook
);

router.delete(
    "/book/:slug",
    controller.deleteBook
)


module.exports = router;
