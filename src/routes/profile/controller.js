const BaseController = require("./../controller");
const bcrypt = require("bcrypt");

module.exports = new (class extends BaseController {
    home(req, res, next) {
        this.response({
            res,
            message: `welcome back ${req.user.email}`,
            data: req.user,
        });
    }

    async change_password(req, res, next) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        const isValid = await bcrypt.compare(
            req.body.old_password,
            user.password
        );
        if (!isValid) {
            return this.response({
                res,
                code: 400,
                message: "Current Password is Wrong",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.new_password1, salt);
        await this.prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                password,
            },
        });

        this.response({
            res,
            message: "Password Successfully Changed",
        });
    }
})();
