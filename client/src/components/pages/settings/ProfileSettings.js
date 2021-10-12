import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux';

import useForm from "../../../hooks/useForm";
import useUpdateUser from '../../../hooks/useUpdateUser';

const ProfileSettings = () => {
  const [values, handleChange] = useForm({ description: "" });
  const [isUpdated, updateUser] = useUpdateUser(values.description)
  const error = useSelector(state => state.error);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUser()

    values.description = "";
  }

  return (
    <div className="profile-settings">
      <form className="setting-section" onSubmit={(e) => handleUpdate(e)}>
        <label htmlFor="description">Description:</label>
        <textarea 
          name="description" 
          value={values.description} 
          onChange={handleChange} 
          className="input"
          ></textarea>
        <button type="submit" className="setting-btn btn" disabled={!values.description ? true : false}>Save Settings</button>
          {
            isUpdated &&
            !error.id &&
            <div className="msg">
              <span>Updated successfully</span>
            </div>
          }
        {/* {
          <ul className={"errors " + (errors[0] ? "show" : "hide") }>
            {
              errors ? errors.map((error, i) => (
                <li className="alert" key={i}>{error.msg}</li>
              )) : null
            }
          </ul>
          } */}
      </form>
    </div>
  )
}

export default ProfileSettings
