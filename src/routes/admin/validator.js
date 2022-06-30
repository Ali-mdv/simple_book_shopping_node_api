const { check } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

module.exports = new (class {
    ///////////////////////////////////////////////////////////////
    // validator for user model
    updateUser() {
        return [
            check("first")
                .isLength({
                    max: 40,
                })
                .withMessage("max character for First Name is 40"),

            check("last")
                .isLength({
                    max: 40,
                })
                .withMessage("max character for Last Name is 40"),

            check("email")
                .notEmpty()
                .withMessage("Email is required")
                .bail()
                .isEmail()
                .withMessage("Email format is wrong")
                .bail()
                .isLength({ max: 60 })
                .withMessage("max character for Email is 60")
                .custom(async (value, { req }) => {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: value,
                        },
                    });
                    if (user && req.params.id != user.id)
                        throw new Error("Email Already Exist");
                    return value;
                }),

            check("phone_number")
                .notEmpty()
                .withMessage("Phone Number is required")
                .bail()
                .isLength({ max: 15 })
                .withMessage("max character for email is 15")
                .bail()
                .isMobilePhone()
                .withMessage("Phone Number format is wrong")
                .custom(async (value, { req }) => {
                    const user = await prisma.user.findUnique({
                        where: {
                            phone_number: value,
                        },
                    });
                    if (user && req.params.id != user.id)
                        throw new Error("Phone Number Already Exist");
                    return value;
                }),

            check("is_active")
                .isBoolean()
                .withMessage("is_active must be booloan type"),

            check("is_staff")
                .isBoolean()
                .withMessage("is_staff must be booloan type"),

            check("is_admin")
                .isBoolean()
                .withMessage("is_admin must be booloan type"),
        ];
    }

    ///////////////////////////////////////////////////////////////
    // validator for author model
    createAuthor() {
        return [
            check("first")
                .notEmpty()
                .withMessage("First Name is required")
                .bail()
                .isLength({
                    max: 40,
                })
                .withMessage("max character for First Name is 40"),

            check("middle")
                .isLength({
                    max: 40,
                })
                .withMessage("max character for Middle Name is 40"),

            check("last")
                .notEmpty()
                .withMessage("Last Name is required")
                .bail()
                .isLength({
                    max: 40,
                })
                .withMessage("max character for Last Name is 40")
                .custom(async (value, { req }) => {
                    //checks that one author's slug does not overlap with another
                    const slug = slugify(
                        `${req.body.first} ${req.body.middle || ""} ${
                            req.body.last
                        }`,
                        { lower: true }
                    );
                    const author = await prisma.author.findUnique({
                        where: {
                            slug,
                        },
                    });
                    // if req.params.slug === author.slug indicates that the author slug taken is the same as the other author slug
                    if (author && req.params.slug !== author.slug)
                        throw new Error("author with this name already exist");
                    return value;
                }),

            check("description")
                .isLength({
                    max: 256,
                })
                .withMessage("max character for Description is 256"),
        ];
    }
})();
