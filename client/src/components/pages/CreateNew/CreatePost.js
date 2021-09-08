import React from 'react';
import ReactMarkdown from "react-markdown";

import { useForm } from "../../../hooks/useForm";

const CreatePost = () => {
  const [values, handleChange] = useForm({ title: "", tags: "", content: "" });

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="create-post">
      <div className="editor">
        <div className="editor-options">
          <button className="option-btn">Edit</button>
          <button className="option-btn">Preview</button>
        </div>
        <form className="editor-fields" onSubmit={(e) => onSubmit(e)}>
          <div className="post-title">
            <input 
              className="editor-title" 
              placeholder="Post title..." 
              type="text" 
            />
            <input 
              className="editor-tags" 
              placeholder="Add maximum of 4 tags..." 
              type="text" 
            />
          </div>
          <div className="post-content">
            <textarea className="editor-content" placeholder="Post content..."></textarea>
          </div>
          <input className="editor-btn btn" type="submit" value="Publish" />
        </form>
      </div>
      {/* <div className="create-post-info"> 
        a
      </div> */}
    </div>
  )
}

export default CreatePost 
