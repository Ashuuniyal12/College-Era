import PostModal from "../Modals/postModal.js";
import mongoose from "mongoose";
import UserModal from "../Modals/userModal.js";

//create a post
export const createPost = async (req, res) => {
    const newPost = new PostModal(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get a post 
export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModal.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//updatea post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModal.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("You can update only your post");
        }

    } catch (e) {
        res.status(500).json(e);
    }
}

//delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModal.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (e) {
        res.status(500).json(e);
    }
}

//like and dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModal.findById(id);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post Liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Disliked");
        }

    } catch (e) {
        res.status(500).json(e);
    }
}

//get timeline posts

export const getTimelinePosts = async (req, res) => {

    const userId = req.params.id;

    try {
        const currentUserPost = await PostModal.find({ userId: userId });

        const followingPost = await UserModal.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPost"
                }
            },
            {
                $project: {
                    followingPost: 1,
                    _id: 0
                }
            }
        ])
        res.status(200)
            .json(currentUserPost.concat(...followingPost[0].followingPost)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
            );
    } catch (e) {
        res.status(500).json(e);
    }
}