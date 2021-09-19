import React from 'react';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
            <ReactMarkdown
              className="p-content-live" 
              children={post.content} 
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark}
                      language={match[1]}
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }} 
            />
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
