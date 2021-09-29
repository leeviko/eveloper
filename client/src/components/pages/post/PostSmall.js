import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

import { UserActions } from './PostBody';

import Tag from "./Tag";

const PostSmall = ({ bid, uid, title, tags, date }) => {
  const [loading, setLoading] = useState(null);
  const [formatDate, setFormatDate] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    const newdate = day + "." + month + "." + year;

    setFormatDate(newdate)
    getAuthor()
  }, [])

  const getAuthor = () => {
    setLoading(true)
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    axios.get(`/api/search/users/${uid}`, headers)
      .then((res) => {
        setUser(res.data.usersRes[0])
        setLoading(false)
        return console.log(user);
      })
      .catch((err) => {
        setLoading(false)
        return console.log(err);
      })
  }


  return (
    <div className="post-small">
      <div className="post-info">
        <p>
          {
            user === null ? null : user.name
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
        <UserActions />
      </div>
    </div>
  )
}

export default PostSmall
