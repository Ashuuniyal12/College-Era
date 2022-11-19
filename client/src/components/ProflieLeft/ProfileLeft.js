import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import './ProfileLeft.css'

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft flex flex-col  gap-4 h-screen overflow-hidden">
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
