import React, { useState, useEffect } from 'react'
import { getUser } from '../../API/UserRequest'

const Conversation = ({ data, currentUser, online }) => {

    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)
        console.log(userId);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data);
            }
            catch (error) {
                console.log(error)
            }
        }
        getUserData();
    }, [])

    return (
        <>


            <div className="follower converstaion mb-2">
                <div className='flex flex-row gap-2'>
                    <div>
                        {online && <div className="online-dot"></div>}
                        <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                            process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="image of user"
                            className="followerImage"
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                        <div className="name flex flex-col mt-2" style={{ fontSize: '0.8rem' }}>
                            <span>{userData?.firstname} {userData?.lastname}</span>
                           <span>{online ? "Online" : "Offline"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" w-4/5 justify-self-center" style={{ border: '0.1px solid #ececec ' }} />
        </>
    )
}

export default Conversation