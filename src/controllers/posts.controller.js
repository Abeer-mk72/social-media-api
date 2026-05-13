const Post = require("../models/Post.model");

class PostsController {

    getAll = async (req, res) => {

        const posts = await Post.find();

        res.status(200).json(posts);
    };

    getOne = async (req, res) => {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    };

    add = async (req, res) => {

        const post = await Post.create(req.body);

        res.status(201).json(post);
    };

    update = async (req, res) => {

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    };

    remove = async (req, res) => {

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted"
        });
    };
}

module.exports = new PostsController();