import React from 'react'

import useFollow from '../../../hooks/useFollow';

const AuthorInfo = ({ author, uid }) => {
  const [isFollowed, follow] = useFollow(uid, author.uid);

  const handleFollow = () => {
    follow()
  }

  return (
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
          isFollowed === null ? "Loading..." :
          isFollowed ? "Unfollow" : "Follow"
        }
      </button>
    </>
  )
}

export default AuthorInfo
