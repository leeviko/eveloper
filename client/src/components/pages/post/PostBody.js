import React, { useState, useEffect } from 'react';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../../actions/errorActions';

import { newComment } from '../../../actions/postActions';

import useLike from '../../../hooks/useLike';
import useForm from '../../../hooks/useForm';
import useComment from '../../../hooks/useComment';

import Tag from "./Tag";
import Comment from "./Comment";

import LikeImg from "../../../images/like.svg";
import LikedImg from "../../../images/liked.svg";
import ChatImg from "../../../images/chat.svg";
import { Redirect } from 'react-router';

const PostBody = ({ post, comments }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const [uid, setUid] = useState("");
  const [values, handleChange] = useForm({ newComment: "" })
  const [errors, setErrors] = useState([])


  useEffect(() => {
    if(isAuthenticated) {
      setUid(user.uid)
    }
  }, [])

  const handleComment = (e) => {
    e.preventDefault();

    if(!values.newComment) {
      setErrors(prev => [...prev, {msg: "You need to be logged in", param: ""}]);
    } else {
      if(isAuthenticated) {
        dispatch(newComment(post.bid, uid, values.newComment, user.name))

        values.newComment = "";

      }
    }

  }

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
              <UserActions bid={post.bid} uid={uid} commentCount={comments.length} /> 
            </div>
          </div>
          <div className="post-comments">
            <h1 className="comments-title">Discussion ({comments.length})</h1>
            <div className="post-comments-container">
              <form className="new-comment" onSubmit={(e) => handleComment(e)}>
                <textarea 
                  name="newComment" 
                  value={values.newComment} 
                  onChange={handleChange}
                  placeholder="Add new comment"
                >
                </textarea>
                {
                  <ul className={"errors " + (errors[0] ? "show" : "hide") }>
                    {
                      errors ? errors.map((error, i) => (
                        <li className="alert" key={i}>{error.msg}</li>
                      )) : null
                    }
                  </ul>
                }
                <button type="submit" className="comment-btn btn">Submit</button>
              </form>
              {
                comments.map((comment) => (
                  <Comment key={comment.comment_id} name={comment.name} comment={comment.comment} date={comment.createdat}   />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const UserActions = ({ bid, uid }) => {
  const dispatch = useDispatch();
  const commentCount = useComment(bid)
  const error = useSelector(state => state.error)
  const [likesCount, like] = useLike(bid, uid);

  useEffect(() => {
    dispatch(clearErrors())
  }, [])

  const handleClick = () => {
    like()
  }

  return (
    <>
      { error.id === "LIKE_ERROR" && <Redirect to="/register" /> }
      <button className="post-action like" onClick={() => handleClick()}>
        <img src={LikeImg} />
        <span> { likesCount === null ? "Loading..." : likesCount + " Likes" }</span>
      </button>
      <button className="post-action comment">
        <img src={ChatImg} />
        <span>{ commentCount === null ? "Loading..." : commentCount + " Comments" }</span>
      </button>
    </>
  );
}

export default PostBody
