import React from 'react'
import { Link } from 'react-router-dom';

import Tag from "./Tag";

const PostSmall = ({ bid, title, tags }) => {
  return (
    <div className="post-small">
      <h1 className="post-title"><Link to={"/post/" + bid}>{title}</Link></h1>
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
