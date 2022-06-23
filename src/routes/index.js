const router = require("express").Router();
const homeRouter = require("./home");
const accountRouter = require("./account");
const { handledAsyncError } = require("./../middlewares/error_handling");

router.use("/", homeRouter);

router.use("/account", accountRouter);

router.use(handledAsyncError);

router.all("*", (req, res) => {
    return res.status(404).json({
        route: req.url,
        message: "Page Not Found",
        code: 404,
    });
});

module.exports = router;
