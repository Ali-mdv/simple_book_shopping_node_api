const router = require("express").Router();
const homeRouter = require("./home");
const accountRouter = require("./account");
const profileRouter = require("./profile");
const productRouter = require("./product");
const { isAuthenticated } = require("./../middlewares/auth");
const { handledAsyncError } = require("./../middlewares/error_handling");

router.use("/", homeRouter);

router.use("/account", accountRouter);

router.use("/profile",
    isAuthenticated,
    profileRouter
);

router.use("/product", productRouter);

router.use(handledAsyncError);

router.all("*", (req, res) => {
    return res.status(404).json({
        route: req.url,
        message: "Page Not Found",
        code: 404,
    });
});

module.exports = router;
