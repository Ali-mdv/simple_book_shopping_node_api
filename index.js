const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || config.get("PORT");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get("env") === "development") {
    app.use(morgan("dev"));
}

app.listen(port, () => {
    console.log(`app on port ${port}`);
    console.log(`http://localhost:${port}`);
});
