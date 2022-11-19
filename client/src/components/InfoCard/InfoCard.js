import React from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'


const InfoCard = () => {

    const [modalOpened, setmodalOpened] = useState(false);

    return (
        <div className="InfoCard flex flex-col gap-3 p-4 rounded-2xl w-11/12" style={{ backgroundColor: 'var(--cardColor)' }}>
            <div className="InfoHead flex justify-between items-center">
                <h4>Your Info</h4>
                <div>
                    <UilPen width='2rem' height='1.2rem' onClick={() => setmodalOpened(true)} />
                    <ProfileModal modalOpened={modalOpened} setmodalOpened={setmodalOpened}/>
                </div>
            </div>

            <div className="Info">
                <span>
                    <b>Status: </b>
                </span>
                <span>
                    student
                </span>
            </div>

            <div className="Info">
                <span>
                    <b>University: </b>
                </span>
                <span>
                    Graphic Era Hill University
                </span>
            </div>
            <div className="Info">
                <span>
                    <b>Lives in: </b>
                </span>
                <span>
                    Dehradun
                </span>
            </div>

            <button className="button lg-btn">LogOut</button>
        </div>
    )
}

export default InfoCard
