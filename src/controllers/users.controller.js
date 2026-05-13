const User = require("../models/User.model");
const Post = require("../models/Post.model");

class UsersController {
    getAll = async (req, res) => {
        const users = await User.find();

        res.status(200).json(users);
    }

    getOne = async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const posts = await Post.find({ userId: id })
            .sort({ createdAt: -1 })
            .lean();

        const payload = user.toObject();
        payload.posts = posts;

        res.status(200).json(payload);
    }

    add = async (req, res) => {
        const { username, email, age, bio } = req.body;

        const user = await User.create({ username, email, age, bio });

        res.status(201).json(user);
    }

    update = async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { username, email, age, bio } = req.body;

        user.username = username || user.username;
        user.email = email || user.email;
        user.age = age || user.age;
        user.bio = bio || user.bio;

        await user.save();

        res.status(200).json(user);
    }

    remove = async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    }
}

module.exports = new UsersController();