const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.homePage);

module.exports = router;
