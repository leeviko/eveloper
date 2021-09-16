import "../../../Markdown.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from "../../../actions/postActions";
import { useParams } from 'react-router-dom';

import PostBody from './PostBody';
import PostSidebar from './PostSidebar';

const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector(state => state.post.post)
  const isLoading = useSelector(state => state.post.isLoading)
  const [renderPost, setRenderPost] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch])
  
  useEffect(() => {
    if(post && !isLoading) {
      setRenderPost(true)
    } else {
      setRenderPost(false)
    }
    console.log("POST: ",post);
  }, [post, isLoading])

  // useEffect(() => {
  //   if(post && !isLoading) {
  //     setRenderPost(true)
  //   } else {
  //     setRenderPost(false)
  //   }
  // }, [user, isLoading])

  return (
    <div className="post post-wrapper">
      { renderPost && 
        <>
          <PostBody post={post.post} />
          <PostSidebar />
        </>
      }
    </div>
  )
}

export default Post
