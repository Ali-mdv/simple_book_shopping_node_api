const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    home(req, res, next) {
        this.response({
            res,
            message: `welcome back ${req.user.email}`,
            data: req.user,
        });
    }
})();
