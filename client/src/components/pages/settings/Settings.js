import React, { useEffect } from 'react'
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import SideNavItem from "../../SideNavItem";

import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';

const Settings = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    console.log(location.pathname);
  }, [location])

  return (
    <div className="settings">
      {
        !isAuthenticated ? <Redirect to="/login" /> :
        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>
          <div className="settings-content">
            <nav className="sidenav">
              <SideNavItem active={location.pathname} link="/settings" text="Profile" />
              <SideNavItem active={location.pathname} link="/settings/account" text="Account" />
            </nav>
            <div className="settings-detail">
              <Switch>
                <Route exact path="/settings">
                  <ProfileSettings />
                </Route>
                <Route path="/settings/account">
                  <AccountSettings />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Settings
