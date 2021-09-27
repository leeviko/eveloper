import React from 'react'

import Tag from "./Tag";

const PostSmall = ({ title, tags }) => {
  return (
    <div className="post-small">
      <h1 className="post-title">{title}</h1>
      <div className="editor-tags">
        {
          tags.map((tag, i) => (
            <Tag name={tag} key={i} />
          ))
        }
      </div>
    </div>
  )
}

export default PostSmall
