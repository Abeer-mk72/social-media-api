const Comment = require("../models/Comment.model");

class CommentsController {

    getAll = async (req, res) => {

        const comments = await Comment.find();

        res.status(200).json(comments);
    };

    getOne = async (req, res) => {

        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json(comment);
    };

    add = async (req, res) => {

        const comment = await Comment.create(req.body);

        res.status(201).json(comment);
    };

    update = async (req, res) => {

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json(comment);
    };

    remove = async (req, res) => {

        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json({
            message: "Comment deleted"
        });
    };
}

module.exports = new CommentsController();