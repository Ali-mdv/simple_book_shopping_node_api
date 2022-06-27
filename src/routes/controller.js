const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

module.exports = class {
    constructor() {
        autoBind(this);
        this.prisma = prisma;
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

    sendEmail({ from, to, subject, html }) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailData = {
            from,
            to,
            subject,
            html,
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                winston.error(err.message);
            }
        });
    }
};
