import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
// Import Routes
const app = express();

//to server images for public access
app.use('/images', express.static('public/images'))

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());    

dotenv.config();

mongoose
    .connect(process.env.MONGO_DB,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => app.listen(process.env.PORT|| 5000, () => console.log(`Server is running on ${process.env.PORT|| 5000}`))).
    catch((error) => console.log(error.message));



//usage of routes
app.use('/auth',AuthRoute);  
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

