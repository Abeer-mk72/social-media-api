const express = require("express");

const router = express.Router();

const commentsController = require("../controllers/comments.controller");

const asyncHandler = require("../utils/asyncHandler");


router.delete("/:id", asyncHandler(commentsController.remove));


module.exports = router;