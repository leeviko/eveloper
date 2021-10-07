import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from "../../../actions/postActions";
import { useParams, Redirect } from 'react-router-dom';

import PostBody from './PostBody';
import PostSidebar from './PostSidebar';
import PostActions from './PostActions';

const Post = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const post = useSelector(state => state.post.post)
  const isLoading = useSelector(state => state.post.isLoading)
  const [renderPost, setRenderPost] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch])
  
  useEffect(() => {

    try {
      if(post.post) {
        setRenderPost(true)
      }
    } catch(err) {
      setRenderPost(false)
    }
  }, [post, isLoading])


  return (  
    <div className="post post-wrapper">
      { renderPost && 
        <>
          {
            isAuthenticated &&
            user.uid === post.post.uid &&
            <PostActions post={post.post} />
          }
          <PostBody post={post.post} comments={post.comments.comments} />
          <PostSidebar currPost={post.post} />
        </>
      }
    </div>
  )
}

export default Post
