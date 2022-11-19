import React from 'react'
import CoverImage from '../../img/cover.jpg'
import ProfileImage from '../../img/profileImg.png'
import './ProfileCard.css'

const ProfileCard = () => {

    const ProflePage = true;
    return (
        <div className="ProfileCard flex relative gap-4">
            <div className="ProfileImages relative flex flex-col items-center justify-center">
                <img src={CoverImage} alt="Cover Image" />
                <img src={ProfileImage} alt="Profile Image" />
            </div>

            <div className="ProfileName flex flex-col items-center mt-12 gap-3">
                <span>Ashutosh Uniyal</span>
                <span>Graphic Era</span>
            </div>

            <div className="FollowStatus flex flex-col items-center gap-3">
                <hr />
                <div className='flex gap-4 w-4/5 items-center justify-around '>
                    <div className="Follow flex flex-col gap-1 items-center justify-center">
                        <span>54354</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow flex flex-col gap-1 items-center justify-center">
                        <span>1</span>
                        <span>Followers</span>
                    </div>

                    {ProflePage && (
                        <>
                            <div className="vl"></div>

                            <div className="Follow flex flex-col gap-1 items-center justify-center">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>

                    )}
                </div>
                <hr />

            </div>
            {!ProflePage && (
                <span>
                    My Profile
                </span>)
            }

        </div>

    )
}

export default ProfileCard