const express = require("express");

const router = express.Router();

const postsController = require("../controllers/posts.controller");

const asyncHandler = require("../utils/asyncHandler");



router.post("/", asyncHandler(postsController.add));

router.get("/:id",asyncHandler(postsController.getOne));

router.put( "/:id", asyncHandler(postsController.update));

router.delete("/:id", asyncHandler(postsController.remove));

router.post("/:postId/comments", asyncHandler(postsController.addComment));

router.get("/:postId/comments",asyncHandler(postsController.getComments));

router.post("/:postId/like", asyncHandler(postsController.likePost));

router.delete( "/:postId/like", asyncHandler(postsController.unlikePost));

router.get("/:postId/likes", asyncHandler(postsController.getLikes));


module.exports = router;