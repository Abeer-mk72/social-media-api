const Like = require("../models/Like.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

class LikesController {
    getAll = async (req, res) => {
        const likes = await Like.find()
            .populate("userId")
            .populate("postId")
            .sort({ createdAt: -1 });

        res.status(200).json(likes);
    }

    getOne = async (req, res) => {
        const id = req.params.id;

        const like = await Like.findById(id)
            .populate("userId")
            .populate("postId");

        if (!like) return res.status(404).json({ message: "Like not found" });

        res.status(200).json(like);
    }

    add = async (req, res) => {
        const { userId, postId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const oldLike = await Like.findOne({ userId, postId });
        if (oldLike) return res.status(400).json({ message: "You already liked this post" });

        const like = await Like.create({ userId, postId });

        res.status(201).json(like);
    }

    remove = async (req, res) => {
        const id = req.params.id;

        const like = await Like.findById(id);
        if (!like) return res.status(404).json({ message: "Like not found" });

        await Like.findByIdAndDelete(id);

        res.status(200).json({ message: "Like deleted successfully" });
    }
}

module.exports = new LikesController();