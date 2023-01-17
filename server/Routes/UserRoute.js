import express from 'express';
import { getUser,updateUser ,deleteUser,followUser, unfollowUser, getAllUser} from '../Controllers/UserController.js';
const router = express.Router();

router.get('/',getAllUser);      //get all users
router.get('/:id',getUser);        //get a user
router.put('/:id',updateUser);    //update a user
router.delete('/:id',deleteUser);//delete a user
router.put('/:id/follow',followUser); //follow a user
router.put('/:id/unfollow',unfollowUser); //unfollow a user
export default router;