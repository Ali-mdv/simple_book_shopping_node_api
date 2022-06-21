const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    homePage(req, res, next) {
        return this.response({
            res,
            message: "this is home page",
        });
    }
})();
