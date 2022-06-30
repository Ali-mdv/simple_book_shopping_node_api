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

module.exports = router;
