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

    ///////////////////////////////////////////////////////////////
    //controller for address model
    async addressList(req, res, next) {
        const addresses = await this.prisma.address.findMany({
            where: {
                costomer_id: req.user.id,
            },
        });
        this.response({
            res,
            message: "List of user addresses",
            data: addresses,
        });
    }

    async addressSingle(req, res, next) {
        const address = await this.prisma.address.findFirst({
            where: {
                AND: {
                    costomer_id: req.user.id,
                    id: Number(req.params.id),
                },
            },
        });
        if (!address) return next();

        this.response({
            res,
            message: "user address",
            data: address,
        });
    }

    async addressCreate(req, res, next) {
        const newAdress = await this.prisma.address.create({
            data: {
                city: req.body.city,
                address: req.body.address,
                no: req.body.no,
                unit: Number(req.body.unit),
                postal_code: req.body.postal_code,
                costomer_id: req.user.id,
            },
        });
        this.response({
            res,
            message: "Address Created",
            code: 201,
            data: newAdress,
        });
    }

    async addressUpdate(req, res, next) {
        let address = await this.prisma.address.findFirst({
            where: {
                AND: {
                    costomer_id: req.user.id,
                    id: Number(req.params.id),
                },
            },
        });

        if (!address) return next();

        address = await this.prisma.address.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                city: req.body.city,
                address: req.body.address,
                no: req.body.no,
                unit: Number(req.body.unit),
                postal_code: req.body.postal_code,
            },
        });

        this.response({
            res,
            message: "Address Updated",
            data: address,
        });
    }

    async addressDelete(req, res, next) {
        const address = await this.prisma.address.findFirst({
            where: {
                AND: {
                    costomer_id: req.user.id,
                    id: Number(req.params.id),
                },
            },
        });

        if (!address) return next();

        await this.prisma.address.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        this.response({
            res,
            message: "Address Deleted",
            code: 204,
        });
    }

    ///////////////////////////////////////////////////////////////
    //controller for order model
    async orderList(req, res, next) {
        const orders = await this.prisma.order.findMany({
            where: {
                costomer_id: req.user.id,
            },
        });
        this.response({
            res,
            message: "List of user orders",
            data: orders,
        });
    }

    async orderSingle(req, res, next) {
        const orderDetail = await this.prisma.orderDetail.findMany({
            where: {
                order_id: req.params.id,
            },
            include: {
                book: true,
            },
        });
        if (!orderDetail) return next();

        this.response({
            res,
            message: "Detail user order",
            data: orderDetail,
        });
    }

    // delete item in active order
    async deleteDetailOrder(req, res, next) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: req.params.id,
                is_paid: false,
            },
        });

        // if order does not exit return 404
        if (!order) return next();

        const orderDetail = await this.prisma.orderDetail.findFirst({
            where: {
                id: req.body.detail_id,
                order_id: req.params.id,
            },
        });

        // if item does not exit return 404
        if (!orderDetail) return next();

        //delete item from active order list
        await this.prisma.orderDetail.delete({
            where: {
                id: req.body.detail_id,
            },
        });

        this.response({
            res,
            code: 204,
        });
    }
})();
