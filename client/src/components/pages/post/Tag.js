import React from 'react';
import { Link } from "react-router-dom";

const Tag = ({ name, i }) => {
  return (
    <Link className="tag" to="#">{name}</Link>
  )
}

export default Tag
