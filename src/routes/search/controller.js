const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    async productListInCategory(req, res, next) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug: req.params.slug,
            },
        });
        if (!category) {
            return this.response({
                res,
                message: "category does not exist",
                code: 404,
            });
        }

        const products = await this.prisma.book.findMany({
            where: {
                category_id: category.id,
                title: {
                    contains: req.query.title,
                },
            },
            include: {
                author: true,
                category: true,
            },
        });

        this.response({
            res,
            message: req.query.title
                ? `search by < ${req.query.title} > title in < ${category.title} > category}`
                : `all product in < ${category.title} > category`,
            code: products.length > 0 ? 200 : 404,
            data: products,
        });
    }
})();
