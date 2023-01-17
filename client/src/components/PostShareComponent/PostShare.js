import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImg from '../../img/profileImg.png'
import {UilScenery,  UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import {useDispatch, useSelector} from 'react-redux'
import { uploadImg, uploadPost } from '../../actions/uploadAction'

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const loading = useSelector(state => state.postReducer.uploading)
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.authReducer.authData)
    const [img, setImg] = useState(null);
    const imgRef = useRef();
    const desc = useRef();
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImg(img);
        }
    }
    const reset=()=>{
        setImg(null);
        desc.current.value='';
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const newPost= {
            userId: user._id,
            desc: desc.current.value,    
        }
        //upload the image part in the server.
        if(img){
            const data = new FormData();
            const fileName = Date.now() + img.name;
            data.append("name", fileName);
            data.append("file", img);
            newPost.img = fileName;

            try{
                dispatch(uploadImg(data));

            }catch(err){
                console.log(err)
            }
        }

        dispatch(uploadPost(newPost))
        reset();
    }
    return (
        <div className="PostShare flex gap-4 p-4 rounded-2xl">
            <img src={user.profilePicture? serverPublic+user.profilePicture : serverPublic+'defaultProfile.png'} alt="ProfileImg" />
            <div>
                <input ref ={desc} required type="text" placeholder="What's happening" />

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
                        <UilTimes onClick={() => { setImg(null) }} />
                        <img src={URL.createObjectURL(img)} alt="preview" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default PostShare