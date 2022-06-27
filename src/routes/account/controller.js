const BaseController = require("./../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const _ = require("lodash");

module.exports = new (class extends BaseController {
    async register(req, res, next) {
        const newUser = _.pick(req.body, [
            "first",
            "last",
            "password1",
            "email",
            "phone_number",
        ]);

        const salt = await bcrypt.genSalt(10);
        newUser.password1 = await bcrypt.hash(newUser.password1, salt);

        const createUser = await this.prisma.user.create({
            data: {
                first: newUser.first ? newUser.first : null,
                last: newUser.last ? newUser.last : null,
                password: newUser.password1,
                email: newUser.email,
                phone_number: newUser.phone_number,
            },
        });

        const createToken = await this.prisma.token.create({
            data: {
                user_id: createUser.id,
                token: crypto.randomBytes(32).toString("hex"),
            },
        });

        this.sendEmail({
            from: process.env.EMAIL_USER,
            to: createUser.email,
            subject: "Email Verification",
            html: `<p><a href="http://localhost:${process.env.PORT}/account/activate/${createToken.token}">clicked to activate account</a></p>`,
        });

        return this.response({
            res,
            message: "Register Successfully",
            code: 201,
            data: _.omit(createUser, ["password"]),
        });
    }

    async login(req, res, next) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return this.response({
                res,
                code: 400,
                message: "Invalid Email or Password",
            });
        }

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return this.response({
                res,
                code: 400,
                message: "Invalid Email or Password",
            });
        }

        const accessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_ACCESS,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_REFRESH,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        return this.response({
            res,
            message: "Login Successfully",
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    async activateAccount(req, res, next) {
        const token = await this.prisma.token.findUnique({
            where: {
                token: req.params.token,
            },
        });

        if (!token) {
            return this.response({
                res,
                message: "Invalid Token",
                code: 400,
            });
        }
        const user = await this.prisma.user.update({
            where: {
                id: token.user_id,
            },
            data: {
                is_active: true,
            },
        });

        await this.prisma.token.delete({
            where: {
                token: req.params.token,
            },
        });

        return this.response({
            res,
            message: "Activate Account Successfully",
        });
    }

    async reset_password(req, res, next) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            let token = await this.prisma.token.findUnique({
                where: {
                    user_id: user.id,
                },
            });
            if (!token) {
                token = await this.prisma.token.create({
                    data: {
                        user_id: user.id,
                        token: crypto.randomBytes(32).toString("hex"),
                    },
                });
            }
            this.sendEmail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Email Verification",
                html: `<p><a href="http://localhost:${process.env.PORT}/account/confirm_reset_password/${token.token}">clicked to reset password</a></p>`,
            });
        }

        return this.response({
            res,
            message: "send reset password link to your email",
        });
    }

    async confirm_reset_password(req, res, next) {
        const token = await this.prisma.token.findUnique({
            where: {
                token: req.params.token,
            },
        });
        if (token) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password1, salt);

            const user = await this.prisma.user.update({
                where: {
                    id: token.user_id,
                },
                data: {
                    password: password,
                },
            });
            await this.prisma.token.delete({
                where: {
                    token: token.token,
                },
            });
        }

        return this.response({
            res,
            message: token ? "Reset Password Successfully" : "Token Invalid",
            code: token ? 200 : 400,
        });
    }
})();
