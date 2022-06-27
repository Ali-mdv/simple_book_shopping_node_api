const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    async productList(req, res, next) {
        const products = await this.prisma.book.findMany({
            include: {
                category: true,
                author: true,
            },
        });
        this.response({
            res,
            message: "All Products",
            data: products,
        });
    }

    async productSingle(req, res, next) {
        const product = await this.prisma.book.findUnique({
            where: {
                slug: req.params.slug,
            },
            include: {
                category: true,
                author: true,
            },
        });
        if (!product) return next();
        this.response({
            res,
            message: "All Products",
            data: product,
        });
    }
})();
