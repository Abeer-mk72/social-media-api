const Post = require("../models/Post.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Like = require("../models/Like.model");

class PostsController {
    getAll = async (req, res) => {
        const posts = await Post.find()
            .populate("userId")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    }

    getOne = async (req, res) => {
        const id = req.params.id;

        const post = await Post.findById(id).populate("userId");
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comments = await Comment.find({ postId: id })
            .populate("userId")
            .sort({ createdAt: -1 })
            .lean();

        const likes = await Like.find({ postId: id })
            .populate("userId")
            .sort({ createdAt: -1 })
            .lean();

        const payload = post.toObject();
        payload.comments = comments;
        payload.likes = likes;

        res.status(200).json(payload);
    }

    add = async (req, res) => {
        const { body, media, isPublic, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.create({ body, media, isPublic, userId });

        res.status(201).json(post);
    }

    update = async (req, res) => {
        const id = req.params.id;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const { body, media, isPublic } = req.body;

        post.body = body || post.body;
        post.media = media || post.media;

        if (isPublic !== undefined) {
            post.isPublic = isPublic;
        }

        await post.save();

        res.status(200).json(post);
    }

    remove = async (req, res) => {
        const id = req.params.id;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "Post deleted successfully" });
    }
}

module.exports = new PostsController();