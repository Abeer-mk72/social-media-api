const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username :{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true

    },
    age:{
        type: Number,
        required: true,
        min:15
    },
    bio:{
        type: String,
        default: ""
    }


}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;