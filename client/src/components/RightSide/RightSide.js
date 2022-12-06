import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting,UilEstate,UilBell,UilMessage} from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../InfoCard/ShareModal/ShareModal'
import { Icon } from '@iconify/react';

const RightSide = () => {

  const [modalOpened, setmodalOpened] = useState(false);

  return (
   <div className="RightSide flex flex-col gap-8">
        <div className="NavIcon flex mt-4 flex-row justify-between">
        
            <Icon icon="material-symbols:home-outline-rounded" width="30" height="30" />
            <Icon icon="ant-design:setting-outlined" width="30" height="30" />
            <Icon icon="mdi:bell-notification-outline" width="30" height="30" />
            <Icon icon="material-symbols:chat-outline" width="30" height="30" />
            
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