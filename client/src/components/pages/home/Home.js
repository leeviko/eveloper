import React from 'react'

import { Switch, Route } from 'react-router';

import HomeNav from './HomeNav';
import RecentFeed from "./RecentFeed";
import TopFeed from "./TopFeed";

const Home = ({ currentPage }) => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-feed">
          <div className="home-feed-container">
            <div className="home-nav">
              <HomeNav currentPage={currentPage} />
            </div>
            <div className="feed-content">
              <Switch>
                <Route exact path="/">
                  <RecentFeed />
                </Route>
                <Route exact path="/top">
                  <TopFeed />
                </Route>
              </Switch>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
