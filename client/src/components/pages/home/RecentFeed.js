import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecent } from '../../../actions/searchActions';

import PostSmall from "../post/PostSmall";

const RecentFeed = () => {
  const dispatch = useDispatch();
  const recentRes = useSelector(state => state.search.searchResult)
  const [recentResult, setRecentResult] = useState(null);

  useEffect(() =>  {
    dispatch(getRecent())
  }, [])
  
  useEffect(() => {
    try {
      if(recentRes.recentResult) {
        setRecentResult(recentRes.recentResult)
        console.log(recentResult);
      } else {
        setRecentResult(null)
      }
    } catch(err) {
      console.log("LOAINDGk");
    }
  }, [recentRes])

  useEffect(() => {
    console.log(recentResult);
  }, [recentResult])

  return (
    <div className="feed">
      {
        !recentResult ? "Posts loading..." : 
        <>
          {
            recentResult.map(post => (
              <PostSmall key={post.bid} bid={post.bid} author_id={post.uid} title={post.title} tags={post.tags} date={post.createdat} />
            ))
          }
        </> 
      }
    </div>
  )
}

export default RecentFeed
