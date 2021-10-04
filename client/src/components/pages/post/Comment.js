import React from 'react'

import useDate from '../../../hooks/useDate'

const Comment = ({ name, comment, date }) => {
  const formatDate = useDate(date)

  return (
    <div className="post-comment">
      <div className="post-comment-content">
        <div className="comment-top">
          <p className="post-comment-user">{name}</p>
          <span className="post-comment-date">{formatDate}</span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default Comment
