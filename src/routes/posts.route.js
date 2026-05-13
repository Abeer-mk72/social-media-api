const express = require("express");

const postsController = require("../controllers/posts.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
    "/",
   asyncHandler(postsController.getAll)
);

router.get(
    "/:id",
   asyncHandler(postsController.getOne)
);

router.post(
    "/",
   asyncHandler(postsController.add)
);

router.put(
    "/:id",
   asyncHandler(postsController.update)
);

router.delete(
    "/:id",
   asyncHandler(postsController.remove)
);

module.exports = router;