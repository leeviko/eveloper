import React, { useState, useEffect } from 'react'

import AuthorInfo from './AuthorInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthor } from '../../../actions/postActions';


const PostSidebar = ({ currPost }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const author = useSelector(state => state.post.post.author)
  const [uid, setUid] = useState(null);

  useEffect(() => {
    dispatch(getAuthor(currPost.uid))
    if(isAuthenticated) {
      setUid(user.uid)
    }
  }, [])

  return (
    <div className="post-sidebar">
      <div className="post-sidebar-content">
        {
          author &&
          <>
            <AuthorInfo author={author} uid={uid} />
          </>
        }
      </div>
    </div>
  )
}

export default PostSidebar
