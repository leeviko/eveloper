import React, { useEffect } from 'react'
import { Link, useParams, Redirect } from "react-router-dom"

import { useSelector } from "react-redux";

import PostSmall from "../post/PostSmall";
import Date from "../../Date";

import useProfile from "../../../hooks/useProfile";

const Profile = () => {
  const { name } = useParams();
  const userProf = useProfile(name);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    console.log(userProf);
  }, [])

  return (
    <div className="profile">
      { !userProf ? "Loading..." : 
        <div className="profile-container">
          <div className="profile-main-section p-section">
            <div className="top">
              { 
                isAuthenticated &&
                user.uid === userProf.user.uid &&
                <div className="profile-options">
                  <Link to="/settings/profile" className="profile-edit-btn btn">Edit Profile</Link>
                </div>
              }
            </div>
            <div className="bottom">
              <div className="profile-name">{ userProf.user.name }</div>
              <p className="profile-desc">{ userProf.user.description }</p>
              <div className="profile-info">
                {/* <Link className="profile-link profile-info-text" to="/">https://github.com/</Link>
                <Link className="profile-link profile-info-text" to="/">https://www.youtube.com</Link> */}
                <span className="profile-info-text">Joined on <Date date={userProf.user.createdat} /></span>
              </div>
            </div>
          </div>

          <div className="profile-sec-sections">
            <div className="profile-stats p-section">
              <div>{ userProf.posts.length } Posts written</div>
            </div>
            <div className="profile-posts">
              {
                userProf.posts.map((post) => (
                  <PostSmall key={post.bid} bid={post.bid} author_id={post.uid} title={post.title} tags={post.tags} date={post.createdat} />
                ))
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile
