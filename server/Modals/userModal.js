import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
    },
    profilePicture: String,
    coverPicture: String,
    followers: [],
    following: [],
    about: String,
    status: String,
    university: String,
    livesin: String,
    country: String,
},
    { timestamps: true } // this will add createdAt and updatedAt fields to the schema    
);

const UserModal = mongoose.model('User', userSchema);
export default UserModal;