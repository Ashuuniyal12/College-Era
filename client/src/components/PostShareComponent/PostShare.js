import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImg from '../../img/profileImg.png'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import {  uploadPost } from '../../actions/uploadAction'
import defaultProfile from '../../img/defaultProfile.png'


const PostShare = () => {
    const loading = useSelector(state => state.postReducer.uploading)
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducer.authData)
    const [img, setImg] = useState("");
    const imgRef = useRef();
    const desc = useRef();
    const onImageChange = (e) => {
        let res ="";
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                res= reader.result //base64encoded string
                setImg(res);
                console.log("res", res);
              };     
        }
    }
    const reset = () => {
        setImg(null);
        desc.current.value = '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            name: user.firstname + " " + user.lastname,
            desc: desc.current.value,
            profilePicture: user.profilePicture ? user.profilePicture : 'defaultProfile.png',
            username: user.username,
            img: img
        }
        console.log(newPost);
        dispatch(uploadPost(newPost))
        reset();
    }

    return (
        <div className="PostShare flex gap-4 p-4 rounded-2xl">
            <img src={user.profilePicture ? user.profilePicture : defaultProfile} alt="ProfileImg" />
            <div>
                <input ref={desc} required type="text" placeholder="What's happening" />

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

                    <button className='button ps-button' disable= {loading} onClick={handleSubmit}>
                        {loading? "uploading...":'Share'}
                    </button>

                    <div className='hidden'>
                        <input type="file" name="myImage" ref={imgRef} onChange={onImageChange} />
                    </div>
                </div>


                {img && (
                    <div className="previewImage">
                        <UilTimes onClick={() => { setImg("") }} />
                        <img src={img} alt="preview" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default PostShare