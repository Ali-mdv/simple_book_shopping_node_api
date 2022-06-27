const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/", controller.home);

router.post(
    "/change_password",
    validator.change_password(),
    controller.validate,
    controller.change_password
);

module.exports = router;
