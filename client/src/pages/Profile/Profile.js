import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProflieLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'

const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft/>

        <div className="ProfileCenter flex flex-col gap-4">
            <ProfileCard/>
            <PostSide/>
        </div>

        <RightSide/>
    </div>
  )
}

export default Profile
