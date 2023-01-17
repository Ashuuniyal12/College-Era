import UserModal from "../Modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all users
export const getAllUser = async (req, res) => {
    try {
        let users = await UserModal.find();

        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get a user from db
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModal.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;

            res.status(200).json(otherDetails);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    const { _id, password } = req.body;

    if (id === _id) {
        try {

            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModal.findByIdAndUpdate(id, req.body, { new: true });

            const token = jwt.sign({
                username: user.username, id: user._id
            }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: "You can update only your account" });
    }
};


//delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentuserId, currentUserAdminStatus } = req.body;

    if (id === currentuserId || currentUserAdminStatus) {
        try {
            await UserModal.findByIdAndDelete(id);
            res.status(200).json({ message: "User has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: "You can delete only your account" });
    }
}

//follow a user 
export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    // console.log(id, _id);

    if (id == _id) {
        res.status(403).json({ message: "You can't follow yourself" });
    }
    else {
        try {
            const followUser = await UserModal.findById(id);
            const followingUser = await UserModal.findById(_id);

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json({ message: "User has been followed" });
            } else {
                res.status(403).json({ message: "You already follow this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

//unfollow a user
export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    //console.log(id, currentuserId);

    if (id == _id) {
        res.status(403).json({ message: "You can't unfollow yourself" });
    }
    else {
        try {
            const followUser = await UserModal.findById(id);
            const followingUser = await UserModal.findById(_id);

            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json({ message: "User has been unfollowed" });
            } else {
                res.status(403).json({ message: "You don't follow this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};