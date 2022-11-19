import React from 'react'
import './FollowersCard.css'

import { Followers } from '../../Data/FollowersData'

const FollowersCard = () => {
  return (
    <div className ="FollowersCard w-full rounded-full gap-4 flex flex-col text-sm">
        <h3>Who is Following You</h3>

        {Followers.map((follower,id) =>{
           return(
                <div className="follower flex justify-between items-center" key={id}>
                    <div className=" flex gap-3">
                        <img src={follower.img} alt="image" 
                            className="followerImg w-14 h-14 rounded-full"/>
                        <div className="name flex flex-col items-start justify-center">
                            <span>{follower.name}</span>
                            <span>@{follower.userName}</span>
                        </div>
                    </div>

                    <button className='button fc-button' >
                        Follow
                    </button>
                </div>
           )
        })}
    </div>
  )
}

export default FollowersCard