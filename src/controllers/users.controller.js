const User = require("../models/User.model");

class UsersController {

    getAll = async (req, res) => {

        const users = await User.find();

        res.status(200).json(users);
    };

    getOne = async (req, res) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    };

    add = async (req, res) => {

        const user = await User.create(req.body);

        res.status(201).json(user);
    };

    update = async (req, res) => {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    };

    remove = async (req, res) => {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted"
        });
    };
}

module.exports = new UsersController();