import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../InfoCard/ShareModal/ShareModal'

const RightSide = () => {

  const [modalOpened, setmodalOpened] = useState(false);

  return (
   <div className="RightSide flex flex-col gap-8">
        <div className="NavIcon flex mt-4 flex-row justify-between">
            <img src={Home} alt="Home"/>
            <UilSetting/>
            <img src={Noti} alt="Noti"/>
            <img src={Comment} alt="Comment"/>
        </div>

       
        <TrendCard/>

        <button className="button r-button" onClick={() => setmodalOpened(true)}>
            Share
        </button>
        <ShareModal modalOpened={modalOpened} setmodalOpened={setmodalOpened}/>
   </div>
  )
}

export default RightSide