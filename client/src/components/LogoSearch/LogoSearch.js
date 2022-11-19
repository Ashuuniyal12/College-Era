import React from 'react'
import Logo from '../../img/mainlogo.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'


const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <img src={Logo} alt='LOGO' style={{width: '55px'}}/>
        <div className="Search flex">
            <input type='text' placeholder='#Explore'/>
            <div className='s-icon flex item-center justify-center'>
                <UilSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch