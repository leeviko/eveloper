import React, { useState, useEffect } from 'react'
import useGetAuthor from '../../../hooks/useGetAuthor';
import useFollow from '../../../hooks/useFollow';

import AuthorInfo from './AuthorInfo';
import { useSelector } from 'react-redux';


const PostSidebar = ({ post }) => {
  const user = useSelector(state => state.auth.user)
  const author = useGetAuthor(post.uid);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if(isAuthenticated) {
      setUid(user.uid)
    }
  }, [])

  return (
    <div className="post-sidebar">
      {
      author && uid &&
      <>
        <div className="post-sidebar-content">
          <AuthorInfo author={author} uid={uid} />
        </div>
      </>
      }
    </div>
  )
}

export default PostSidebar
