import React ,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { followUser , unfollowUser} from '../../actions/userAction';
import '../FollowersCard/FollowersCard.css'

const User = ({person}) => {

    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following , setFollowing] = useState(person.followers.includes(user._id));

    const handleFollow = () => {
        following? dispatch(unfollowUser(person._id , user)) :
         dispatch(followUser(person._id , user));
        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower flex justify-between items-center">
            <div className=" flex gap-3">
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} alt="image"
                    className="followerImg w-14 h-14 rounded-full" />
                <div className="name flex flex-col items-start justify-center">
                    <span>{person.firstname +" "+person.lastname}</span>
                    <span>{person.username}</span>
                </div>
            </div>

            <button className={following ? 'button fc-button unfollowButton': "button fc-button "}  onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User