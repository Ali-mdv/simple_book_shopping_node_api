const { check } = require("express-validator");

module.exports = new (class {
    addProductToCart() {
        return [
            check("count")
                .isInt()
                .withMessage("count must be number")
                .bail()
                .custom((value) => {
                    if (value < 0) {
                        throw new Error("count must be posetive");
                    }
                    return value;
                }),
        ];
    }
})();
