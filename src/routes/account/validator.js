const { check } = require("express-validator");

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
                .withMessage("max character for Email is 60"),

            check("phone_number")
                .notEmpty()
                .withMessage("Phone Number is required")
                .bail()
                .isLength({ max: 15 })
                .withMessage("max character for email is 15")
                .bail()
                .isMobilePhone()
                .withMessage("Phone Number format is wrong"),
        ];
    }
})();
