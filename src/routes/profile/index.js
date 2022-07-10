const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

router.get(
    "/",
    controller.home
);


router.post(
    "/change_password",
    validator.change_password(),
    controller.validate,
    controller.change_password
);


///////////////////////////////////////////////////////////////
// get-update-delete user model
router.get(
    "/addresses",
    controller.addressList
);

router.get(
    "/address/:id",
    controller.addressSingle
);

router.post(
    "/addresses",
    validator.addressCreateUpdate(),
    controller.validate,
    controller.addressCreate
);

router.put(
    "/address/:id",
    validator.addressCreateUpdate(),
    controller.validate,
    controller.addressUpdate
);

router.delete(
    "/address/:id",
    controller.addressDelete
);


module.exports = router;
