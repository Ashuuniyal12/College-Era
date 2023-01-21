import UserModal from "../Modals/userModal.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


//Registering a new user 
export const registeUSer = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newuser = new UserModal(req.body);
        const{username} = req.body;

        const oldUser = await UserModal.findOne({username});
        if(oldUser) return res.status(400).json({message: "User already exists"});

        const user = await newuser.save();

        const token = jwt.sign({ 
            username: user.username, id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Login a user
export const LoginUser = async (req, res) => {
    try{
        const { username, password, email } = req.body;

        const user = await UserModal.findOne({ username });

        if(user){

            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){  
                res.status(400).json({message: "Invalid Password"});
            }else{
                const token = jwt.sign({ 
                    username: user.username, id: user._id
                }, process.env.JWT_SECRET, {expiresIn: '5s'});
                res.status(200).json({user, token});
            }
        }else{
            res.status(400).json({message: "User don't Exist"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}