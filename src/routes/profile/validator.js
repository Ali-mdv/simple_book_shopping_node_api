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
})();
