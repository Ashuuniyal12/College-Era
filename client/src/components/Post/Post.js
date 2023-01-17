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

  return (
    <div className="Post flex flex-col p-4 gap-4 rounded-2xl" styel={{ backgoundColor: 'var(--cardColor)' }}>
      {/* <div className="profilename flex w-full flex-row h-16 ">
        <img src={ data.userId} alt="img" />
      </div>   */}
      <img src={data.img ? process.env.REACT_APP_PUBLIC_FOLDER + data.img : "NOT FOUND"} alt="image" />

      <div className="PostReact flex items-start gap-6">

        <Icon icon={heart} color="#2FA4E4" width="30" height="30" onClick={handleLikePost} style={{ cursor: "pointer" }} />
        <Icon icon="material-symbols:chat-bubble-outline" width="30" height="30" />
        <Icon icon="material-symbols:share" width="30" height="30" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likeCount} likes</span>
      <div className="Details">
        <span><b>{data.Name} </b></span>
        <span>{data.desc}</span>
      </div>
    </div>
  )
}

export default Post