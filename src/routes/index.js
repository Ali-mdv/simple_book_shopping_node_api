const router = require("express").Router();
const homeRouter = require("./home");
const accountRouter = require("./account");

router.use("/", homeRouter);

router.use("/account", accountRouter);

module.exports = router;
