import React from 'react';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import Tag from "./Tag";

import LikeImg from "../../../images/like.svg";
import LikedImg from "../../../images/liked.svg";
import ChatImg from "../../../images/chat.svg";

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
                  <Tag name={tag} key={i} />
                ))
              }
            </div>
          </div>
          <div className="post-content">
            <ReactMarkdown className="p-content-live" children={post.content} remarkPlugins={[remarkGfm]} />
            <div className="post-actions">
              <UserActions /> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const UserActions = () => {
  return (
    <>
      <div className="post-action">
        <img src={LikeImg} />
        <span>Like</span>
      </div>
      <div className="post-action">
        <img src={ChatImg} />
        <span>Comment</span>
      </div>
    </>
  )
}

export default PostBody
