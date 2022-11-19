import React from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
const InfoCard = () => {
    return (
        <div className="InfoCard flex flex-col gap-3 p-4 rounded-2xl w-11/12" style={{ backgroundColor: 'var(--cardColor)' }}>
            <div className="InfoHead flex justify-between items-center">
                <h4>Your Info</h4>
                <div>
                    <UilPen width='2rem' height='1.2rem' />
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
