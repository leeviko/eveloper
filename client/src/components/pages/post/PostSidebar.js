import React, { useEffect } from 'react'
import useGetAuthor from '../../../hooks/useGetAuthor';
import AuthorInfo from './AuthorInfo';

const PostSidebar = ({ post }) => {
  const author = useGetAuthor(post.uid);

  useEffect(() => {
    console.log(author);
  }, [author])

  return (
    <div className="post-sidebar">
      {
      !author ? "Loading..." :
      <div className="post-sidebar-content">
        <AuthorInfo author={author} />
      </div>
      // <div className="post-sidebar-content">
      //   <p className="author-name">{author.name}</p>
      //   <p>Joined on {author.createdat}</p>
      // </div>
      }
    </div>
  )
}

export default PostSidebar
