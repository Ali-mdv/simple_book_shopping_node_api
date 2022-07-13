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
// get-update-delete address model for each user
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


///////////////////////////////////////////////////////////////
// get-update-delete order model for each user
router.get(
    "/orders",
    controller.orderList
);

router.get(
    "/order/:id",
    controller.orderSingle
);

// delete item from active order list 
router.delete(
    "/order/:id",
    validator.deleteDetailOrder(),
    controller.validate,
    controller.deleteDetailOrder
);

module.exports = router;
