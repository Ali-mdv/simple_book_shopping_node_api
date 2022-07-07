const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    ///////////////////////////////////////////////////////////////
    //controller for category model
    async categoryList(req, res, next) {
        const categories = await this.prisma.category.findMany({});
        this.response({
            res,
            message: "All Categories",
            data: categories,
        });
    }

    async productListInCategory(req, res, next) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug: req.params.slug,
            },
        });
        if (!category) return next();

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

    ///////////////////////////////////////////////////////////////
    //controller for author model
    async authorList(req, res, next) {
        const authors = await this.prisma.author.findMany({});
        this.response({
            res,
            message: "All Authors",
            data: authors,
        });
    }

    async productListInAuthor(req, res, next) {
        const author = await this.prisma.author.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        if (!author) return next();

        const products = await this.prisma.book.findMany({
            where: {
                author_id: author.id,
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
                ? `search by < ${req.query.title} > title in < ${author.first} ${author.last} > author}`
                : `all product in < ${author.first} ${author.last}> category`,
            code: products.length > 0 ? 200 : 404,
            data: products,
        });
    }
})();
