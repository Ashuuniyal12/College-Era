import React, { useState } from 'react'
import './RightSide.css'
import { UilSetting, UilEstate, UilBell, UilMessage } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../InfoCard/ShareModal/ShareModal'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'
const RightSide = () => {

  const [modalOpened, setmodalOpened] = useState(false);

  return (
    <div className="RightSide flex flex-col gap-8">
      <div className="NavIcon flex mt-4 flex-row justify-between">
        <Link to='../home'>
          <Icon className='icon' icon="material-symbols:home-outline-rounded" width="30" height="30" />
        </Link>
        <Icon className='icon' icon="ant-design:setting-outlined" width="30" height="30" />
        <Icon className='icon' icon="mdi:bell-notification-outline" width="30" height="30" />
        <Link to='../chat'>
          <Icon className='icon' icon="material-symbols:chat-outline" width="30" height="30" />
        </Link>
      </div>


      <TrendCard />

      <button className="button r-button" onClick={() => setmodalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setmodalOpened={setmodalOpened} />
    </div>
  )
}

export default RightSide