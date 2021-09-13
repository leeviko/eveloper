import React, { Fragment, useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../../actions/postActions";
import { clearErrors } from "../../../actions/errorActions";
import { Redirect } from "react-router-dom";

import useForm from "../../../hooks/useForm";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tagsArr, setTagsArr] = useState("");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const post = useSelector(state => state.post);
  const isLoading = useSelector(state => state.post.isLoading);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [values, handleChange] = useForm({ title: "", tags: "", content: "" });

  const { tags } = values;

  // Clear errors on page refresh
  useEffect(() => {
    dispatch(clearErrors());
    setErrors([])
  }, [])
  
  // Check errors
  useEffect(() => {
    console.log("ERROR: ", error);
    if(error.id === "POST_ERROR") {
      setErrors([])
      error.msg.map((msg) => (
        setErrors(prev => [...prev, {msg: msg.msg, param: msg.param}])
      ))
    }
  }, [error])
  
  useEffect(() => {
    if(post.post && error.id != "POST_ERROR") {
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
  }, [post])

  useEffect(() => {
    setTagsArr([...tags.split(",")]);
  }, [values.tags])

  
  const handleSubmit = (e) => {

    e.preventDefault();
    
    const { title, content } = values;

    const uid = user.uid;
    const bid = title.replace(/\s{2,}/g,' ').trim().replace(/\s+/g, '-').toLowerCase();

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
      { submitted && <Redirect to="/post/:id" />  }
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
          {
            <ul className={"errors " + (errors[0] ? "show" : "hide") }>
              {
                errors ? errors.map((error, i) => (
                  <li className="alert" key={i}>{error.msg}</li>
                )) : null
              }
            </ul>
          }
    </Fragment>
  )
}

const Edit = ({ setShowPreview, handleSubmit, values, handleChange }) => {
  return (
    <div className="create-post">
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn highlight" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <form className="editor-fields" onSubmit={(e) => handleSubmit(e)}>
          <div className="post-title">
            <input 
              className="editor-title" 
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
              className="editor-content p-content" 
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
  console.log(values.content);
  return (
    <div className="create-post post-preview">
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn highlight" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <form className="editor-preview" onSubmit={(e) => handleSubmit(e)}>
          <div className="post-title">
            <h1 className="editor-title">{values.title}</h1>
            <div className="editor-tags">
              {
                tagsArr ?
                tagsArr.map((tag, i) => (
                  <div className="tag" key={i}>#{tag}</div>
                ))
                : null
              }
            </div>
          </div>
          <div className="post-content">
            <ReactMarkdown className="p-content" children={values.content} remarkPlugins={[remarkGfm]} />
          </div>
          <input className="editor-btn btn" type="submit" value="Publish" />
        </form>
      </div>
    </div>
  );
}

export default CreatePost 
