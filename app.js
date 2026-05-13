require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const usersRoutes = require("./src/routes/users.route");
const postsRoutes = require("./src/routes/posts.route");
const commentsRoutes = require("./src/routes/comments.route");

const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) => {
    res.status(200).json("Server is running");
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("server is running");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
    });