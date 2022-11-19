import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImg from '../../img/profileImg.png'
import {UilScenery,  UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'


const PostShare = () => {
    const [img, setImg] = useState(null);
    const imgRef = useRef();

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImg({
                image: URL.createObjectURL(img),
            });
        }
    }

    return (
        <div className="PostShare flex gap-4 p-4 rounded-2xl">
            <img src={ProfileImg} alt="ProfileImg" />
            <div>
                <input type="text" placeholder="What's happening" />

                <div className='PostOption flex  justify-around'>

                    <div className="option" style={{ color: "var(--photo)" }}
                        onClick={() => imgRef.current.click()}>
                        <UilScenery />Photo
                    </div>

                    <div className="option" style={{ color: "var(--video)" }} >
                        <UilPlayCircle />Video
                    </div>

                    <div className="option" style={{ color: "var(--location)" }}>
                        <UilLocationPoint />Location
                    </div>

                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <UilSchedule />Shedule
                    </div>

                    <button className='button ps-button'>
                        Share
                    </button>

                    <div className='hidden'>
                        <input type="file" name="myImage" ref={imgRef} onChange={onImageChange} />
                    </div>
                </div>

                {img && (
                    <div className="previewImage">
                        <UilTimes onClick={() => { setImg(null) }} />
                        <img src={img.image} alt="preview" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default PostShare