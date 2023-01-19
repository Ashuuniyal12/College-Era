import React, { useState } from 'react'
import './Post.css'
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux'
import { likePost } from '../../API/PostRequest'



const Post = ({ data }) => {

  const { user } = useSelector((state) => state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likeCount, setLikeCount] = useState(data.likes.length)

  let heart = liked ? 'mdi:cards-heart' : 'mdi:cards-heart-outline';

  const handleLikePost = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id);
    liked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1)
  }
  console.log("data", data)
  return (
    <div className="Post flex flex-col p-4 gap-4 rounded-2xl" styel={{ backgoundColor: 'var(--cardColor)' }}>
      {/* <div className="profilename flex w-full flex-row h-16 ">
        <img src={ data.userId} alt="img" />
      </div>   */}
      <div className=' profileDetails flex flex-row gap-2 '>
        <img className="rounded-full w-10 h-10" src={data.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + data.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} />
        <span >{data.name}</span>
      </div>
      <div className="Details">
        <span><b>{data.username} </b></span>
        <span>{data.desc}</span>
      </div>
      { data.img &&
        <div className='image-holder'>
       <img className="" src={process.env.REACT_APP_PUBLIC_FOLDER + data.img} alt="image" />
      </div>
      }
      <div className="PostReact flex items-start gap-6">

        <Icon icon={heart} color="#2FA4E4" width="30" height="30" onClick={handleLikePost} style={{ cursor: "pointer" }} />
        <Icon icon="material-symbols:chat-bubble-outline" width="30" height="30" />
        <Icon icon="material-symbols:share" width="30" height="30" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likeCount} likes</span>
    </div>
  )
}

export default Post