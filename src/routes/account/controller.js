const BaseController = require("./../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

        const createUser = await this.User.create({
            data: {
                first: newUser.first ? newUser.first : null,
                last: newUser.last ? newUser.last : null,
                password: newUser.password1,
                email: newUser.email,
                phone_number: newUser.phone_number,
            },
        });

        return this.response({
            res,
            message: "Register Successfully",
            code: 201,
            data: _.omit(createUser, ["password"]),
        });
    }

    async login(req, res, next) {
        const user = await this.User.findUnique({
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
})();
