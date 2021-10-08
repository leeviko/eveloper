import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPost } from "../../../actions/postActions";
import { useParams, Redirect } from 'react-router-dom';

import PostBody from './PostBody';
import PostSidebar from './PostSidebar';

const Post = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const post = useSelector(state => state.post.post)
  const isLoading = useSelector(state => state.post.isLoading)
  const [renderPost, setRenderPost] = useState(false);
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deletePost(post.post.bid))

    setIsSubmitted(true)

  }

  return (  
    <div className="post post-wrapper">
      { isSubmitted && !error.id != "POST_DELETE_FAIL" &&
        <Redirect to="/" />
      }
      { renderPost && 
        <>
          {
            isAuthenticated &&
            user.uid === post.post.uid &&
            <>
              <div className="post-actions post-sidebar">
                <form className="post-sidebar-content" onSubmit={(e) => handleDelete(e)}>
                  <button type="submit" className="btn delete-btn">Delete Post</button>
                </form>
              </div>
            </>
            // <PostActions post={post.post} />
          }
          <PostBody post={post.post} comments={post.comments.comments} />
          <PostSidebar currPost={post.post} />
        </>
      }
    </div>
  )
}

export default Post
