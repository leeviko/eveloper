import React from 'react';

import useDate from "../hooks/useDate";

const Date = ({ date }) => {
  const formatDate = useDate(date);
  
  return (
    <>
      { formatDate }
    </>
  )
}

export default Date
