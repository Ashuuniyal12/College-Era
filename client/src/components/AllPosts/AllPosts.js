import React, { useEffect } from 'react'
import './AllPosts.css'
//import {PostData} from '../../Data/PostsData'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeLinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const AllPosts = () => {

  const params = useParams();

  const dispatch = useDispatch();
  //find current user from redux store
  const {user} = useSelector((state) => state.authReducer.authData)
  //find all posts from redux store
  let {posts,loading} = useSelector((state) => state.postReducer)

  useEffect(() => {
     dispatch(getTimeLinePosts(user._id))
  }, [])

  if(!posts) return "No Post";
  if(params.id) posts = posts.filter((post)=>post.userId === params.id)

  return (
    <div className="Posts felx flex-col gap-x-4">
        {loading? "Fetching Post...":posts.map((post,id)=>{
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