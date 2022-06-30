const BaseController = require("./../controller");
const _ = require("lodash");
const slugify = require("slugify");

module.exports = new (class extends BaseController {
    ///////////////////////////////////////////////////////////////
    //controller for user model
    async getUserList(req, res, next) {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
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
            message: `user ${user.email}`,
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

    ///////////////////////////////////////////////////////////////
    //controller for author model
    async getAuthorList(req, res, next) {
        const authors = await this.prisma.author.findMany({
            select: {
                id: true,
                first: true,
                last: true,
                slug: true,
                description: true,
            },
        });

        this.response({
            res,
            message: "authors list",
            data: authors,
        });
    }

    async getAuthorSingle(req, res, next) {
        const author = await this.prisma.author.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        // if author not exist return error 404
        if (!author) return next();

        this.response({
            res,
            message: `author ${author.first} ${author.last}`,
            data: author,
        });
    }

    async createAuthor(req, res, next) {
        const slug = slugify(
            `${req.body.first} ${req.body.middle || ""} ${req.body.last}`,
            { lower: true }
        );

        const author = await this.prisma.author.findUnique({
            where: {
                slug: slug,
            },
        });

        if (author) {
            return this.response({
                res,
                code: 400,
                message: `author ${author.first} ${author.last} Already Exist`,
            });
        }

        const newAuthor = await this.prisma.author.create({
            data: {
                first: req.body.first || null,
                middle: req.body.middle || null,
                last: req.body.last || null,
                slug: slug,
                description: req.body.description || null,
            },
        });

        this.response({
            res,
            message: `author ${newAuthor.first} ${newAuthor.last} created`,
            data: newAuthor,
        });
    }

    async updateAuthor(req, res, next) {
        let author = await this.prisma.author.findUnique({
            where: {
                slug: req.params.slug,
            },
        });
        // if author not exist return error 404
        if (!author) return next();

        //create slug with first middle and last author name
        const slug = slugify(
            `${req.body.first} ${req.body.middle || ""} ${req.body.last}`,
            { lower: true }
        );

        author = await this.prisma.author.update({
            where: {
                slug: req.params.slug,
            },
            data: {
                first: req.body.first || null,
                middle: req.body.middle || null,
                last: req.body.last || null,
                slug: slug,
                description: req.body.description || null,
            },
        });

        this.response({
            res,
            message: `author ${author.first} ${author.last} updated`,
            data: author,
        });
    }

    async deleteAuthor(req, res, next) {
        let author = await this.prisma.author.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        if (!author) return next();

        await this.prisma.author.delete({
            where: {
                slug: req.params.slug,
            },
        });

        this.response({
            res,
            message: "author successfully deleted",
            code: 204,
        });
    }

    ///////////////////////////////////////////////////////////////
    //controller for category model
    async getCategoryList(req, res, next) {
        const categories = await this.prisma.category.findMany();

        this.response({
            res,
            message: "categories list",
            data: categories,
        });
    }

    async getCategorySingle(req, res, next) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        // if category not exist return error 404
        if (!category) return next();

        this.response({
            res,
            message: `category ${category.title}`,
            data: category,
        });
    }

    async createCategory(req, res, next) {
        //create slug with title
        const slug = slugify(req.body.title, { lower: true });

        const newCategory = await this.prisma.category.create({
            data: {
                title: req.body.title,
                slug: slug,
            },
        });

        this.response({
            res,
            message: `Category ${newCategory.title} created`,
            data: newCategory,
        });
    }

    async updateCategory(req, res, next) {
        let category = await this.prisma.category.findUnique({
            where: {
                slug: req.params.slug,
            },
        });
        // if category not exist return error 404
        if (!category) return next();

        //create slug with title
        const slug = slugify(req.body.title, { lower: true });

        category = await this.prisma.category.update({
            where: {
                slug: req.params.slug,
            },
            data: {
                title: req.body.title,
                slug: slug,
            },
        });

        this.response({
            res,
            message: `category ${category.title} updated`,
            data: category,
        });
    }

    async deleteCategory(req, res, next) {
        let category = await this.prisma.category.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        if (!category) return next();

        await this.prisma.category.delete({
            where: {
                slug: req.params.slug,
            },
        });

        this.response({
            res,
            message: "Category successfully deleted",
            code: 204,
        });
    }
})();
