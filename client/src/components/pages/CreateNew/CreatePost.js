import React, { Fragment, useState } from 'react';
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import useForm from "../../../hooks/useForm";

const CreatePost = () => {
  const [showPreview, setShowPreview] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [values, handleChange] = useForm({ title: "", tags: "", content: "" });

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Fragment>
      { showPreview ? 
        <Preview values={values} setShowPreview={setShowPreview} showPreview={showPreview} /> : 
        <Edit 
          isAuthenticated={isAuthenticated} 
          setShowPreview={setShowPreview}
          showPreview={showPreview}
          onSubmit={onSubmit}
          values={values}
          handleChange={handleChange}

        /> 
      }
    </Fragment>
  )
}

const Edit = ({ isAuthenticated, setShowPreview, showPreview, onSubmit, values, handleChange }) => {
  return (
    <div className="create-post">
      { isAuthenticated === true ? "" : <Redirect to="/login" />}
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn highlight" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <form className="editor-fields" onSubmit={(e) => onSubmit(e)}>
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
              className="editor-content" 
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

const Preview = ({ values, setShowPreview, showPreview }) => {
  console.log(values.content);
  return (
    <div className="create-post post-preview">
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn highlight" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <ReactMarkdown className="editor editor-preview" children={values.content} />
      </div>
    </div>
  );
}

export default CreatePost 
