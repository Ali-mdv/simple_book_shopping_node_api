const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.post(
    "/register",
    validator.register(),
    controller.validate,
    controller.register
);

router.post(
    "/login",
    validator.login(),
    controller.validate,
    controller.login
);

router.get("/activate/:token", 
    controller.activateAccount
);

router.post(
    "/reset_password",
    validator.reset_password(),
    controller.validate,
    controller.reset_password
);

router.post(
    "/confirm_reset_password/:token",
    validator.confirm_reset_password(),
    controller.validate,
    controller.confirm_reset_password
);

module.exports = router;
