const { check } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = new (class {
    register() {
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

            check("password1")
                .notEmpty()
                .withMessage("Password is required")
                .bail()
                .isStrongPassword({ minLength: 8, maxLength: 128 })
                .withMessage(
                    "Password must be 8 character contain at least (one uppercase,one lower case,one special character and one number)"
                ),

            check("password2")
                .notEmpty()
                .withMessage("Password Confirmation is required")
                .bail()
                .custom((val, { req }) => {
                    if (val !== req.body.password1) {
                        throw new Error(
                            "Password Confirmation does not match Password"
                        );
                    }
                    return true;
                }),

            check("email")
                .notEmpty()
                .withMessage("Email is required")
                .bail()
                .isEmail()
                .withMessage("Email format is wrong")
                .bail()
                .isLength({ max: 60 })
                .withMessage("max character for Email is 60")
                .custom(async (value) => {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: value,
                        },
                    });
                    if (user) throw new Error("Email Already Exist");
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
                .custom(async (value) => {
                    const user = await prisma.user.findUnique({
                        where: {
                            phone_number: value,
                        },
                    });
                    if (user) throw new Error("Phone Number Already Exist");
                    return value;
                }),
        ];
    }

    login() {
        return [
            check("email")
                .notEmpty()
                .withMessage("Email is required")
                .bail()
                .isEmail()
                .withMessage("Email format is wrong"),

            check("password").notEmpty().withMessage("Password is required"),
        ];
    }

    reset_password() {
        return [
            check("email")
                .notEmpty()
                .withMessage("Email is required")
                .bail()
                .isEmail()
                .withMessage("Email format is wrong"),
        ];
    }

    confirm_reset_password() {
        return [
            check("password1")
                .notEmpty()
                .withMessage("Password is required")
                .bail()
                .isStrongPassword({ minLength: 8, maxLength: 128 })
                .withMessage(
                    "Password must be 8 character contain at least (one uppercase,one lower case,one special character and one number)"
                ),

            check("password2")
                .notEmpty()
                .withMessage("Password Confirmation is required")
                .bail()
                .custom((val, { req }) => {
                    if (val !== req.body.password1) {
                        throw new Error(
                            "Password Confirmation does not match Password"
                        );
                    }
                    return true;
                }),
        ];
    }
})();
