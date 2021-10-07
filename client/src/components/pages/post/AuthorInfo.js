import React, { useState } from 'react'

import useFollow from '../../../hooks/useFollow';

const AuthorInfo = ({ author, uid }) => {
  const [isFollowed, follow] = useFollow(uid, author.uid);
  const [errors, setErrors] = useState([]);

  const handleFollow = () => {
    setErrors([]);
    if(!uid) {
      setErrors(prev => [...prev, {msg: "You need to be logged in to follow", param: ""}]);
    } else {
      follow()
    }
  }

  return (
    <>
      {
        author &&
        <>
          <p className="author-name">{author.name}</p>
          <p className="author-desc">{author.description}</p>

          <button 
          type="submit"
          onClick={() => handleFollow()} 
          className="author-follow btn" 
          disabled={uid === author.uid ? true : false}
          >
            {
              uid ? 
                isFollowed === null ? "Loading..." :
                isFollowed ? "Unfollow" : "Follow"
                  :
                "Follow"
            }
          </button>
          {
            <ul className={"errors " + (errors[0] ? "show" : "hide") }>
              {
                errors ? errors.map((error, i) => (
                  <li className="alert" key={i}>{error.msg}</li>
                )) : null
              }
            </ul>
          }
        </>
      }
    </>
  )
}

export default AuthorInfo
