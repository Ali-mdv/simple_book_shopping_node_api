const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.post(
    "/register",
    validator.register(),
    controller.validate,
    controller.register
);

module.exports = router;
