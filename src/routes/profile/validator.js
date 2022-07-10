const { check } = require("express-validator");

module.exports = new (class {
    change_password() {
        return [
            check("old_password")
                .notEmpty()
                .withMessage("Current Password is required"),

            check("new_password1")
                .notEmpty()
                .withMessage("New Password is required")
                .bail()
                .isStrongPassword({ minLength: 8, maxLength: 128 })
                .withMessage(
                    "Password must be 8 character contain at least (one uppercase,one lower case,one special character and one number)"
                ),

            check("new_password2")
                .notEmpty()
                .withMessage("New Password Confirmation is required")
                .bail()
                .custom((val, { req }) => {
                    if (val !== req.body.new_password1) {
                        throw new Error(
                            "Password Confirmation does not match Password"
                        );
                    }
                    return true;
                }),
        ];
    }

    ///////////////////////////////////////////////////////////////
    //validator for address model
    addressCreateUpdate() {
        return [
            check("city")
                .notEmpty()
                .withMessage("City is required")
                .isAlpha()
                .bail()
                .withMessage("City is Invalid")
                .bail()
                .isLength({ max: 30 })
                .withMessage("max character for City is 30"),

            check("address")
                .notEmpty()
                .withMessage("Address is required")
                .bail()
                .isLength({ max: 255 })
                .withMessage("max character for Address is 255"),

            check("no")
                .notEmpty()
                .withMessage("NO is required")
                .bail()
                .isLength({ max: 10 })
                .withMessage("max character for NO is 10"),

            check("unit")
                .notEmpty()
                .withMessage("Unit is required")
                .bail()
                .isNumeric()
                .withMessage("NO must be Number")
                .bail()
                .isLength({ max: 10 })
                .withMessage("max character for unit is 10"),

            check("postal_code")
                .notEmpty()
                .withMessage("Postal Code is required")
                .bail()
                .isLength({ max: 40 })
                .withMessage("max character for Postal Code is 40"),
        ];
    }
})();
