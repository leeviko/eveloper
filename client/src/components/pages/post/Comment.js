import React from 'react'

import useDate from '../../../hooks/useDate'

const Comment = ({ user, comment, date }) => {
  const formatDate = useDate(date)

  return (
    <div className="post-comment">
      <div className="post-comment-content">
        <p className="post-comment-user">{user}</p>
        <span className="post-comment-date">{formatDate}</span>
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default Comment
