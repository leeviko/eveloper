import React from 'react';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const PostBody = ({ post }) => {
  
  return (
    <>
      <div className="post-container">
        <div className="editor-options">
        </div>
        <div className="post-body">
          <div className="post-upper">
            <h1 className="post-title">{post.title}</h1>
            <div className="editor-tags">
              {
                post.tags.map((tag, i) => (
                  <div className="tag" key={i}>#{tag}</div>
                ))
              }
            </div>
          </div>
          <div className="post-content">
            <ReactMarkdown className="p-content" children={post.content} remarkPlugins={[remarkGfm]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostBody
