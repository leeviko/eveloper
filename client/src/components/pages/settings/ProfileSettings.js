import React from 'react'

const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <form className="setting-section">
        <label>Description:</label>
        <textarea name="description" className="input"></textarea>
        <label>Username:</label>
        <input name="username" className="input" />
        <button type="submit" className="setting-btn btn">Save Settings</button>
      </form>
    </div>
  )
}

export default ProfileSettings
