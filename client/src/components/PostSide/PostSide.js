import React from 'react'
import AllPosts from '../AllPosts/AllPosts'
import PostShare from '../PostShareComponent/PostShare'
import './PostSide.css'

const PostSide = () => {
  return (
    <div className="PostSide flex flex-col  gap-4 h-screen overflow-auto">
    <PostShare/>
    <AllPosts/>
    </div>
  )
}

export default PostSide