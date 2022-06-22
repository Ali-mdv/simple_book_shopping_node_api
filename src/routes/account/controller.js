const BaseController = require("./../controller");

module.exports = new (class extends BaseController {
    async register(req, res, next) {
        // const user = await this.User.create({
        //     data: req.body,
        // });
        return this.response({
            res,
            message: "Register Successfully",
            code: 201,
            data: req.body,
        });
    }
})();
