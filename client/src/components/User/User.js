import React ,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { followUser , unfollowUser} from '../../actions/userAction';
import '../FollowersCard/FollowersCard.css'
import defaultProfile from "../../img/defaultProfile.png"
import FollowerUserProfile from '../ProfileModal/FollowerUserProfile';

const User = ({person}) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following , setFollowing] = useState(person.followers.includes(user._id));

    const [modalOpened, setmodalOpened] = useState(false);

    const handleFollow = () => {
        following? dispatch(unfollowUser(person._id , user)) :
         dispatch(followUser(person._id , user));
        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower flex justify-between items-center">
            <div className=" flex gap-3"  onClick={() => setmodalOpened(true)}>
                <img src={person.profilePicture ? person.profilePicture : defaultProfile} alt="image"
                    className="followerImg w-14 h-14 rounded-full" />
                <div className="name flex flex-col items-start justify-center">
                    <span>{person.firstname +" "+person.lastname}</span>
                    <span>{person.username}</span>
                    <FollowerUserProfile modalOpened={modalOpened} setmodalOpened={setmodalOpened} data= {person}/>
                </div>
            </div>

            <button className={following ? 'button fc-button unfollowButton': "button fc-button "}  onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User