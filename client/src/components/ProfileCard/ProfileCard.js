import React  ,{useEffect , useState}from 'react'
import './ProfileCard.css'
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as UserApi from '../../API/UserRequest'
import defaultProfile from '../../img/defaultProfile.png'
import defaultCover from '../../img/defaultCover.png'

const ProfileCard = ({location}) => {

    let width= "auto";
    if(location !== "profilePage"){
        width = "18rem"
    }

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const posts = useSelector(state => state.postReducer.posts)


    return (
        <div className="ProfileCard flex relative gap-4 "style= {{width: width}}>
            <div className="ProfileImages relative flex flex-col items-center justify-center">
                <img src={user.coverPicture ? user.coverPicture : defaultCover} alt="Cover Image" />
                <img src={user.profilePicture ? user.profilePicture :defaultProfile} alt="Profile Image" />
            </div>

            <div className="ProfileName flex flex-col items-center mt-12 gap-3">
                <span>{user.firstname} {user.lastname}</span>
                <div className='flex flex-row items-center'>
                    <Icon className='mr-1' color="gray" icon="zondicons:education" />
                    <span>:{user.university ? user.university : "Unknown Institution"}</span>
                </div>

            </div>

            <div className="FollowStatus flex flex-col items-center gap-3">
                <hr />
                <div className='flex gap-4 w-4/5 items-center justify-around '>
                    <div className="Follow flex flex-col gap-1 items-center justify-center">
                        <span>{user.following.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow flex flex-col gap-1 items-center justify-center">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>

                            <div className="Follow flex flex-col gap-1 items-center justify-center">
                                <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>

                    )}
                </div>
                <hr />

            </div>
            {location === "profilePage" ? " " :
                <span>
                    <Link to = {`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            }

        </div>

    )
}

export default ProfileCard