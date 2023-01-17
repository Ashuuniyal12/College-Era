import React, { useEffect } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../API/UserRequest'
import { logout } from '../../actions/AuthAction'

const InfoCard = () => {

    const [modalOpened, setmodalOpened] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const profileUserId = params.id
    const [profileUser, setprofileUser] = useState({})


    const { user } = useSelector(state => state.authReducer.authData)

    useEffect(() => {
        const fetchProfileUSer = async () => {
            if (profileUserId === user._id) {
                setprofileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                setprofileUser(profileUser)

            }
        }
        fetchProfileUSer()
    }, [user])


    const handleLogOut= () => {
        dispatch(logout());
    }
    return (
        <div className="InfoCard flex flex-col gap-3 p-4 rounded-2xl w-11/12" style={{ backgroundColor: 'var(--cardColor)' }}>
            <div className="InfoHead flex justify-between items-center">
                <h4>Profile Info</h4>
                {profileUserId === user._id ? (
                    <div>
                        <UilPen width='2rem' height='1.2rem' onClick={() => setmodalOpened(true)} />
                        <ProfileModal modalOpened={modalOpened} setmodalOpened={setmodalOpened} data= {user}/>
                    </div>
                ) : 
                null}

            </div>

            <div className="Info">
                <span>
                    <b>Status: </b>
                </span>
                <span>
                    {profileUser.status}
                </span>
            </div>

            <div className="Info">
                <span>
                    <b>University: </b>
                </span>
                <span>
                    {profileUser.university}
                </span>
            </div>
            <div className="Info">
                <span>
                    <b>Lives in: </b>
                </span>
                <span>
                    {profileUser.livesin}
                </span>
            </div>

            <button className="button lg-btn" onClick={handleLogOut}>LogOut</button>
        </div>
    )
}

export default InfoCard
