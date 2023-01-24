import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import defaultCover from '../../img/defaultCover.png';
import defaultProfile from '../../img/defaultProfile.png';


const FollowerUserProfile = ({ modalOpened, setmodalOpened, data }) => {

    console.log("data ", data);

    const theme = useMantineTheme();

    return (
        <>
            <Modal
                padding={0}
                opened={modalOpened}
                onClose={() => setmodalOpened(false)}
                overlayOpacity={0.35}
                overlayBlur={3}
                size='55%'
            >
                <div className="text-white" style={{ backgroundColor: "black" }}>
                    <div style={{ backgroundColor: "--cardColor" }}>
                        <div className="ProfileImages relative flex flex-col items-center justify-center">
                            <img src={data.coverPicture ? data.coverPicture : defaultCover} alt="Cover Image" />
                        </div>
                    </div>

                    <div className='flex flex-row items-start mt-4'>

                        <img src={data.profilePicture ? data.profilePicture : defaultProfile} style={{ width: '10rem', height: '10rem' }} alt="Profile Image" />

                        <div className="flex flex-col items-start ml-8">
                        <span className=''>{data.username}</span>
                            <div className="font-bold flex flex-row items-center gap-10">

                                <div>
                                    <b className='pr-2'>{data.following.length}</b>
                                    <span>followings</span>
                                </div>

                                <div>
                                    <b className='pr-2'>{data.followers.length}</b>
                                    <span>followers</span>
                                </div>


                            </div>
                            <hr style={{ width: "100%" }} />
                            
                            <div className="ProfileName flex flex-row items-start mt-5">
                                <span>{data.firstname} {data.lastname}</span>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <span>
                                    <b>University: </b>
                                </span>
                                <span>
                                    {data.university}
                                </span>

                            </div>

                            <div className='flex flex-row gap-4'>
                                <span>
                                    <b>Lives in: </b>
                                </span>
                                <span>
                                    {data.livesin}
                                </span>
                            </div>
                            <div className='flex flex-row gap-4 pb-5'>
                                <span>
                                    <b>Status: </b>
                                </span>
                                <span>
                                    {data.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default FollowerUserProfile