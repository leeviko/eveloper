import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

import useGetAuthor from '../../../hooks/useGetAuthor';
import useDate from '../../../hooks/useDate';
import useComment from '../../../hooks/useComment';
import { useDispatch, useSelector } from 'react-redux';

import { UserActions } from "./PostBody";

import Tag from "./Tag";

const PostSmall = ({ bid, author_id, title, tags, date }) => {
  const user = useSelector(state => state.auth);
  const author = useGetAuthor(author_id)
  const formatDate = useDate(date)
  const [uid, setUid] = useState(null)
  useEffect(() => {
    if(user.isAuthenticated) {
      setUid(user.user.uid)
    }
  }, [])


  return (
    <div className="post-small">
      <div className="post-info">
        <p>
          {
            author === null ? "Loading..." : author.name
          }
        </p>
        <span className="post-created">{formatDate}</span>
      </div>
      <h1 className="post-small-title"><Link to={"/post/" + bid}>{title}</Link></h1>
      <div className="editor-tags">
        {
          tags.map((tag, i) => (
            <Tag name={tag} key={i} />
          ))
        }
      </div>
      <div className="post-actions">
        <UserActions bid={bid} uid={uid} />
      </div>  
    </div>
  )
}

export default PostSmall
