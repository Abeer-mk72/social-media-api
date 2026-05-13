const express = require("express");

const usersController = require("../controllers/users.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
    "/",
    asyncHandler(usersController.getAll)
);

router.get(
    "/:id",
    asyncHandler(usersController.getOne)
);

router.post(
    "/",
    asyncHandler(usersController.add)
);

router.put(
    "/:id",
    asyncHandler(usersController.update)
);

router.delete(
    "/:id",
    asyncHandler(usersController.remove)
);

module.exports = router;