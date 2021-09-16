import React, { Fragment, useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useSelector, useDispatch } from "react-redux";
import { addPost, clearPosts } from "../../../actions/postActions";
import { clearErrors } from "../../../actions/errorActions";
import { Redirect } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import Tag from "../post/Tag";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tagsArr, setTagsArr] = useState("");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const post = useSelector(state => state.post.post);
  const isLoading = useSelector(state => state.post.isLoading);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [values, handleChange] = useForm({ title: "", tags: "", content: "" });
  const [bid, setBid] = useState("");
  const { tags, title, content } = values;

  // Clear errors on page refresh
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(clearPosts());
    setErrors([])
  }, [])
  
  // Check errors
  useEffect(() => {
    if(error.id === "POST_ERROR") {
      setErrors([])
      error.msg.map((msg) => (
        setErrors(prev => [...prev, {msg: msg.msg, param: msg.param}])
      ))
    }
  }, [error])
  
  // Is post submitted
  useEffect(() => {
    try {
      if(post.newPost && error.id != "POST_ERROR") {
        setSubmitted(true)
      }
    } catch(err) {
      setSubmitted(false)
    }
  }, [post])
  
  useEffect(() => {
    setTagsArr([...tags.split(",")]);
    setBid(title.replace(/\s{2,}/g,' ').trim().replace(/\s+/g, '-').toLowerCase())
  }, [values])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const uid = user.uid;
    const newPost = {
      title,
      tags: tagsArr,
      content,
      uid,
      bid
    }
    dispatch(addPost(newPost))
  } 
  
  return ( 
    <Fragment>
      {/* { submitted && <Redirect to={`/post/${bid}`} />  } */}
      { isAuthenticated === true ? "" : <Redirect to="/login" />}
      { showPreview ? 
        <Preview 
          setShowPreview={setShowPreview} 
          handleSubmit={handleSubmit} 
          values={values} 
          tagsArr={tagsArr} 
        /> 
        : 
        <Edit 
          setShowPreview={setShowPreview}
          handleSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
        /> 
      }
          {/* {
            <ul className={"errors " + (errors[0] ? "show" : "hide") }>
              {
                errors ? errors.map((error, i) => (
                  <li className="alert" key={i}>{error.msg}</li>
                )) : null
              }
            </ul>
          } */}
    </Fragment>
  )
}

const Edit = ({ setShowPreview, handleSubmit, values, handleChange }) => {
  return (
    <div className="post post-editor">
      <div className="post-container">
        <div className="editor-options">
          <button className="option-btn highlight" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <form className="post-fields" onSubmit={(e) => handleSubmit(e)}>
          <div className="post-upper">
            <input 
              className="post-title" 
              placeholder="Post title..." 
              type="text" 
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <input 
              className="editor-tags" 
              placeholder="Add maximum of 4 tags..." 
              type="text" 
              name="tags"
              value={values.tags}
              onChange={handleChange}
            />
          </div>
          <div className="post-content">
            <textarea
              className="editor-content p-content-editor" 
              placeholder="Post content..."
              name="content"
              value={values.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <input className="editor-btn btn" type="submit" value="Publish" />
        </form>
      </div>
      {/* <div className="create-post-info"> 
        a
      </div> */}
    </div>
  );
}

const Preview = ({ values, setShowPreview, tagsArr, handleSubmit }) => {
  return (
    <div className="post post-preview">
      <div className="post-container">
        <div className="editor-options">
          <button className="option-btn" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn highlight" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <form className="post-preview" onSubmit={(e) => handleSubmit(e)}>
          <div className="post-upper">
            <h1 className="post-title">{values.title}</h1>
            <div className="editor-tags">
              {
                tagsArr ?
                tagsArr.map((tag, i) => (
                  <Tag name={tag} key={i} />
                ))
                : null
              }
            </div>
          </div>
          <div className="post-content">
            <ReactMarkdown
              className="p-content-live" 
              children={values.content} 
              remarkPlugins={[remarkGfm]} 
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={dark}
                      language={match[1]}
                      PreTag="div"
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
          </div>
          <input className="editor-btn btn" type="submit" value="Publish" />
        </form>
      </div>
    </div>
  );
}

export default CreatePost 
