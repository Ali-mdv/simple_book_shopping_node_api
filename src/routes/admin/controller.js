const BaseController = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends BaseController {
    async getUserList(req, res, next) {
        const users = await this.prisma.user.findMany({
            select: {
                last: true,
                email: true,
                phone_number: true,
            },
        });

        this.response({
            res,
            message: "users list",
            data: users,
        });
    }

    async getUserSingle(req, res, next) {
        const id = Number(req.params.id) || 0;
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) return next();

        this.response({
            res,
            message: "users list",
            data: _.omit(user, ["password"]),
        });
    }

    async updateUserSingle(req, res, next) {
        const id = Number(req.params.id) || 0;
        let user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) return next();

        user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                first: req.body.first || user.first,
                last: req.body.last || user.last,
                email: req.body.email || user.email,
                phone_number: req.body.phone_number || user.phone_number,
                is_active: req.body.is_active || user.is_active,
                is_admin: req.body.is_admin || user.is_admin,
                is_staff: req.body.is_staff || user.is_staff,
            },
        });

        this.response({
            res,
            message: "user successfully updated",
            data: _.omit(user, ["password"]),
        });
    }

    async deleteUserSingle(req, res, next) {
        const id = Number(req.params.id) || 0;
        let user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) return next();

        await this.prisma.user.delete({
            where: {
                id: id,
            },
        });

        this.response({
            res,
            message: "user successfully deleted",
            code: 204,
        });
    }
})();
