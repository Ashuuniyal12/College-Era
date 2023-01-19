import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, max: 500 },
    profilePicture: { type: String, default: "defaultProfile.png" },
    username: { type: String, required: true },
    img: { type: String },
    likes: { type: Array, default: [] },
},
    {
        timestamps: true
    });

const PostModal = mongoose.model("Post", postSchema)
export default PostModal;