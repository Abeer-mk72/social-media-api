const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },

        comment: {
            type: String,
            required: true,
            trim: true
        }
    },

    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;