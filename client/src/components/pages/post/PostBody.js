import React, { useState, useEffect } from 'react';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useDispatch, useSelector } from 'react-redux';

import useGetLikes from '../../../hooks/useGetLikes';

import Tag from "./Tag";

import LikeImg from "../../../images/like.svg";
import LikedImg from "../../../images/liked.svg";
import ChatImg from "../../../images/chat.svg";
import { likePost } from '../../../actions/postActions';

const PostBody = ({ post }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const [uid, setUid] = useState("");

  useEffect(() => {
    if(isAuthenticated) {
      setUid(user.uid)
    }
  }, [])


  // const uid = useSelector(state => state.auth.user.uid)

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
              <UserActions bid={post.bid} uid={uid} post={post} /> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const UserActions = ({bid, uid, post}) => {
  const dispatch = useDispatch();
  const [likesCount, update] = useGetLikes(bid);

  const handleClick = () => {
    dispatch(likePost(bid, uid))
    update()
  }

  return (
    <>
      <button className="post-action" onClick={() => handleClick()}>
        <img src={LikeImg} />
        <span> { likesCount === null ? "Loading..." : likesCount } Likes</span>
      </button>
      <button className="post-action">
        <img src={ChatImg} />
        <span>0 Comments</span>
      </button>
    </>
  )
}

export default PostBody
