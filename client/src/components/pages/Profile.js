import React from 'react'
import { Link } from "react-router-dom"

import AccountImg from "../../images/account-img.webp";
import MoreImg from "../../images/more.svg";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-container">

        <div className="profile-main-section p-section">
          <div className="top">
            <img className="profile-img" src={AccountImg} />
            <div className="profile-options">
              <button className="profile-edit-btn btn">Edit Profile</button>
            </div>
          </div>
          <div className="bottom">
            <div className="profile-name">LePa123</div>
            <p className="profile-desc">Hello i am web developer and focusing on front end</p>
            <div className="profile-info">
              <Link className="profile-link profile-info-text" to="/">https://github.com/</Link>
              <Link className="profile-link profile-info-text" to="/">https://www.youtube.com</Link>
              <span className="profile-info-text">Joined on Apr 23 2021</span>
            </div>
          </div>
        </div>

        <div className="profile-sec-sections">
          <div className="profile-stats p-section">
            <div>55 Blogs</div>
            <div>1245 Followers</div>
          </div>
          <div className="profile-blogs">
            <div className="blog">blog</div>
            <div className="blog">blog</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
