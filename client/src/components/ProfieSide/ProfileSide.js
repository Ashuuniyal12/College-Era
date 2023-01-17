import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'


import './ProfielSide.css'

const ProfileSide = () => {
    return (
        <div className='ProfileSide'>
            <LogoSearch/>
            <ProfileCard location = "homeapage"/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileSide