const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true
        },

        media: {
            type: String,
            default: ""
        },

        isPublic: {
            type: Boolean,
            default: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },

    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;