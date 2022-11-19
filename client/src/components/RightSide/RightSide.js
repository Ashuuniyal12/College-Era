import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'

const RightSide = () => {
  return (
   <div className="RightSide flex flex-col gap-8">
        <div className="NavIcon flex mt-4 flex-row justify-between">
            <img src={Home} alt="Home"/>
            <UilSetting/>
            <img src={Noti} alt="Noti"/>
            <img src={Comment} alt="Comment"/>
        </div>

       
        <TrendCard/>

        <button className="button r-button">
            Share
        </button>
   </div>
  )
}

export default RightSide