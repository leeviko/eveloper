import React, { Fragment, useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../../actions/postActions";
import { Redirect } from "react-router-dom";

import useForm from "../../../hooks/useForm";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [tagsArr, setTagsArr] = useState("");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const [values, handleChange] = useForm({ title: "", tags: "", content: "" });

  const { tags } = values;

  useEffect(() => {
    setTagsArr([...tags.split(",")]);
  }, [values.tags])

  
  const onSubmit = (e) => {
    e.preventDefault();
    
    const { title, content } = values;

    const uid = user.uid;

    const newPost = {
      title,
      tags: tagsArr,
      content,
      uid
    }

    dispatch(addPost(newPost))

  }

  return ( 
    <Fragment>
      { isAuthenticated === true ? "" : <Redirect to="/login" />}
      { showPreview ? 
        <Preview values={values} tagsArr={tagsArr} setTagsArr={setTagsArr} setShowPreview={setShowPreview} showPreview={showPreview} /> 
        : 
        <Edit 
          isAuthenticated={isAuthenticated} 
          tagsArr={tagsArr}
          setTagsArr={setTagsArr}
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

const Preview = ({ values, setShowPreview, showPreview, setTagsArr, tagsArr }) => {
  console.log(values.content);
  return (
    <div className="create-post post-preview">
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn" onClick={() => setShowPreview(false)}>Edit</button>
          <button className="option-btn highlight" onClick={() => setShowPreview(true)}>Preview</button>
        </div>
        <div className="editor-preview">
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
        </div>
      </div>
    </div>
  );
}

export default CreatePost 
