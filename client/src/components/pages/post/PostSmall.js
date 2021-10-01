import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

import useGetAuthor from '../../../hooks/useGetAuthor';
import useGetLikes from '../../../hooks/useGetLikes';
import { useDispatch } from 'react-redux';

import { UserActions } from "./PostBody";

import Tag from "./Tag";

import LikeImg from "../../../images/like.svg";
import ChatImg from "../../../images/chat.svg";

const PostSmall = ({ bid, uid, title, tags, date }) => {
  const dispatch = useDispatch();
  const user = useGetAuthor(uid)
  const postLikes = useGetLikes(bid)
  const [formatDate, setFormatDate] = useState("");

  useEffect(() => {
    console.log(user);
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    const newdate = day + "." + month + "." + year;

    setFormatDate(newdate)
    
    // getLikes()
  }, [])


  // const getAuthor = () => {
  //   setLoading(true)
  //   const headers = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }

  //   axios.get(`/api/search/users/${uid}`, headers)
  //     .then((res) => {
  //       setUser(res.data.usersRes[0])
  //       setLoading(false)
  //       return console.log(user);
  //     })
  //     .catch((err) => {
  //       setLoading(false)
  //       return console.log(err);
  //     })
  // }

  // const getLikes = () => {
  //   setLoading(true);

  //   const headers = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  
  //   axios.get(`/api/posts/${bid}/likes`, headers)
  //     .then((res) => {
  //       setLikeCount(res.data.likes)
  //       setLoading(false)
  //       return console.log(res.data);
  //     })
  //     .catch((err) => {
  //       setLoading(false)
  //       return console.log(err);
  //     })
  // }

  return (
    <div className="post-small">
      <div className="post-info">
        <p>
          {
            user === null ? "Loading..." : user.name
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
        {/* <button className="post-action">
          <img src={LikeImg} />
          <span>{postLikes === null ? "Loading..." : postLikes} Likes</span>
        </button>
        <button className="post-action">
          <img src={ChatImg} />
          <span>0 Comments</span>
        </button> */}
      </div>  
    </div>
  )
}

export default PostSmall
