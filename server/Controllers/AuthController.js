import UserModal from "../Modals/userModal.js";
import bcrypt from "bcrypt";

//Registering a new user 
export const registeUSer = async (req, res) => {
    try {
        const { username, email, password, firstname, lastname } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new UserModal({
            username,
            email,
            password: hashedPassword,
            firstname,
            lastname,
        });
        
        await newuser.save();
        res.status(200).json(newuser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Login a user
export const LoginUser = async (req, res) => {
    try{
        const { username, password, emial } = req.body;

        const user = await UserModal.findOne({ username });

        if(user){

            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){  
                res.status(200).json(user);
            }else{
                res.status(400).json({message: "Invalid Password"});
            }
        }else{
            res.status(400).json({message: "User don't Exist"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
