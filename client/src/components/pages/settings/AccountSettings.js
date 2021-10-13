import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { deleteUser } from '../../../actions/authActions';

const AccountSettings = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.error);
  const [deleted, setDeleted] = useState(null)


  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteUser())

    setDeleted(true)

  }

  return (
    <div className="account-settings">
      {
        deleted &&
        !error.id &&
          <Redirect to="/" />
      }
      <form className="setting-section" onSubmit={(e) => handleDelete(e)}>
        <button type="submit" className="delete-btn btn">Delete Account</button>
      </form>
    </div>
  )
}

export default AccountSettings
