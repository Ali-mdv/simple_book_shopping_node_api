const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

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

module.exports = router;
