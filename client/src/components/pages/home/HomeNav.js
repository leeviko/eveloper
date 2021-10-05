import React from 'react'
import { Link } from "react-router-dom";


const HomeNav = ({ currentPage }) => {
  return (
    <div className="editor-options">
      <Link to="/" className={"option-btn " + (currentPage == "recent" && "highlight")}>Recent</Link>
      <Link to="/top" className={"option-btn " + (currentPage == "top" && "highlight")}>Top</Link>
    </div>
  )
}

export default HomeNav
