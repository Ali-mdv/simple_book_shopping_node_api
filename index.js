require("app-module-path").addPath(__dirname);
const express = require("express");
require("express-async-errors");
require("dotenv").config();
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const router = require("./src/routes");

const app = express();
const port = process.env.PORT || config.get("PORT");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get("env") === "development") {
    app.use(morgan("dev"));
}

app.use(router);

process.on("uncaughtException", (error) => {
    console.log(error.message, error);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.log(reason.message, reason);
    process.exit(1);
});

app.listen(port, () => {
    console.log(`app on port ${port}`);
    console.log(`http://localhost:${port}`);
});
