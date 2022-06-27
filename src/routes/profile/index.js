const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/", controller.home);

module.exports = router;
