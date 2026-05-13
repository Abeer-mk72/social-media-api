const express = require("express");

const commentsController = require("../controllers/comments.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
    "/",
    asyncHandler(commentsController.getAll)
);

router.get(
    "/:id",
    asyncHandler(commentsController.getOne)
);

router.post(
    "/",
    asyncHandler(commentsController.add)
);

router.put(
    "/:id",
    asyncHandler(commentsController.update)
);

router.delete(
    "/:id",
    asyncHandler(commentsController.remove)
);

module.exports = router;