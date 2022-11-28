import UserModal from "../Modals/userModal.js";
import bcrypt from "bcrypt";

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
export const updateUser = async (req,res)=>{
    const id = req.params.id;

    const {currentuserId, currentUserAdminStatus, password} = req.body;

    if(id===currentuserId || currentUserAdminStatus){
        try{

            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModal.findByIdAndUpdate(id, req.body, {new: true});

            res.status(200).json(user);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }else{
        res.status(403).json({message: "You can update only your account"});
    }
};


//delete a user
export const deleteUser = async (req,res)=>{
    const id = req.params.id;

    const {currentuserId, currentUserAdminStatus} = req.body;

    if(id===currentuserId || currentUserAdminStatus){
        try{
            await UserModal.findByIdAndDelete(id);
            res.status(200).json({message: "User has been deleted"});
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }else{
        res.status(403).json({message: "You can delete only your account"});
    }
}

//follow a user 
export const followUser = async (req,res)=>{
    const id = req.params.id;
    const {currentuserId} = req.body;

    console.log(id, currentuserId);

    if(id==currentuserId){
        res.status(403).json({message: "You can't follow yourself"});
    }
    else{
        try{
            const followUser =await UserModal.findById(id);
            const followingUser = await UserModal.findById(currentuserId);

            if(!followUser.followers.includes(currentuserId)){
                await followUser.updateOne({$push: {followers: currentuserId}});
                await followingUser.updateOne({$push: {following: id}});
                res.status(200).json({message: "User has been followed"});
            }else{
                res.status(403).json({message: "You already follow this user"});
            }
        } catch(error){
            res.status(500).json({message: error.message});
        }
    }
};

//unfollow a user
export const unfollowUser = async (req,res)=>{
    const id = req.params.id;
    const {currentuserId} = req.body;

    //console.log(id, currentuserId);

    if(id==currentuserId){
        res.status(403).json({message: "You can't unfollow yourself"});
    }
    else{
        try{
            const followUser =await UserModal.findById(id);
            const followingUser = await UserModal.findById(currentuserId);

            if(followUser.followers.includes(currentuserId)){
                await followUser.updateOne({$pull: {followers: currentuserId}});
                await followingUser.updateOne({$pull: {following: id}});
                res.status(200).json({message: "User has been unfollowed"});
            }else{
                res.status(403).json({message: "You so not follow this user"});
            }
        } catch(error){
            res.status(500).json({message: error.message});
        }
    }
};