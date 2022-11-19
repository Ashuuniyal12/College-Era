import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'




const Post = ({data}) => {
  return (
    <div className="Post flex flex-col p-4 gap-4 rounded-2xl" styel={{backgoundColor: 'var(--cardColor)'}}>
        <img src= {data.img} alt="image" />

        <div className="PostReact flex items-start gap-6">
            <img src={data.liked? Like: NotLike} atl= ""/>
            <img src={Comment} atl= ""/>
            <img src={Share} atl= ""/>
        </div>

        <span style={{color: 'var(--gray)',fontSize: '12px'}}>{data.likes} likes</span>
        <div className="Details">
            <span><b>{data.Name} </b></span>
            <span>{data.desc}</span>
        </div>
    </div>
  )
}

export default Post