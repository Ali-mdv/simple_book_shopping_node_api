const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

module.exports = class {
    constructor() {
        autoBind(this);
        this.User = prisma.user;
    }

    validarionBody(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array().map((v) => v.msg);
            const messages = [];
            errors.forEach((v) => {
                messages.push({});
            });

            this.response({
                res,
                message: "data validation error",
                code: 400,
                data: errors,
            });
            return false;
        }
        return true;
    }

    validate(req, res, next) {
        if (!this.validarionBody(req, res)) {
            return;
        }
        next();
    }

    response({ res, message, code = 200, data = {} }) {
        res.status(code).json({
            message,
            code,
            data,
        });
    }
};
