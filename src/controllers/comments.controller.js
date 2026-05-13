const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

class CommentsController {
    getAll = async (req, res) => {
        const comments = await Comment.find()
            .populate("userId")
            .populate("postId")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    }

    getOne = async (req, res) => {
        const id = req.params.id;

        const comment = await Comment.findById(id)
            .populate("userId")
            .populate("postId");

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        res.status(200).json(comment);
    }

    add = async (req, res) => {
        const { comment, userId, postId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = await Comment.create({ comment, userId, postId });

        res.status(201).json(newComment);
    }

    update = async (req, res) => {
        const id = req.params.id;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const { comment: text } = req.body;

        comment.comment = text || comment.comment;

        await comment.save();

        res.status(200).json(comment);
    }

    remove = async (req, res) => {
        const id = req.params.id;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        await Comment.findByIdAndDelete(id);

        res.status(200).json({ message: "Comment deleted successfully" });
    }
}

module.exports = new CommentsController();