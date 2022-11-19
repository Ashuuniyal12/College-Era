import React from 'react'
import './AllPosts.css'
import {PostData} from '../../Data/PostsData'
import Post from '../Post/Post'

const AllPosts = () => {
  return (
    <div className="Posts felx flex-col gap-x-4">
        {PostData.map((post,id)=>{
            return(
                <Post
                  data={post} id = {id}
                />
            )
        })}
    </div>
  )
}

export default AllPosts