const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

const asyncHandler = require("../utils/asyncHandler");


router.post("/",asyncHandler(usersController.add));

router.get( "/:id",asyncHandler(usersController.getOne));

router.put("/:id",asyncHandler(usersController.update));

router.delete( "/:id", asyncHandler(usersController.remove));


router.get("/:id/posts",asyncHandler(usersController.getUserPosts));


module.exports = router;