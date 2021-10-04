import React from 'react'
import useDate from '../../../hooks/useDate';

const AuthorInfo = ({ author }) => {
  const formatDate = useDate(author.createdat)

  return (
    <>
      <p className="author-name">{author.name}</p>
      <p className="author-desc">desc</p>
      <button className="author-follow btn">Follow</button>
    </>
  )
}

export default AuthorInfo
