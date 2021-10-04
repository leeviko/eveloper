import React, { useState, useEffect } from 'react'
import useDate from '../../../hooks/useDate';

import { useSelector } from 'react-redux';

const AuthorInfo = ({ author }) => {
  const formatDate = useDate(author.createdat)
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [uid, setUid] = useState(null)

  useEffect(() => {
    if(isAuthenticated) {
      setUid(user.uid)
    }
  }, [])

  return (
    <>
      <p className="author-name">{author.name}</p>
      <p className="author-desc">{author.description}</p>
      <button 
        onClick={() => console.log("lol")} 
        className="author-follow btn" 
        disabled={uid === author.uid ? true : false}
      >Follow</button>
    </>
  )
}

export default AuthorInfo
