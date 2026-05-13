const Like = require("../models/Like.model");

class LikesController {

    getAll = async (req, res) => {

        const likes = await Like.find();

        res.status(200).json(likes);
    };

    getOne = async (req, res) => {

        const like = await Like.findById(req.params.id);

        if (!like) {
            return res.status(404).json({
                message: "Like not found"
            });
        }

        res.status(200).json(like);
    };

    add = async (req, res) => {

        const like = await Like.create(req.body);

        res.status(201).json(like);
    };

    remove = async (req, res) => {

        const like = await Like.findByIdAndDelete(req.params.id);

        if (!like) {
            return res.status(404).json({
                message: "Like not found"
            });
        }

        res.status(200).json({
            message: "Like deleted"
        });
    };
}

module.exports = new LikesController();