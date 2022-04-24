import React from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//user profile
const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container">
            <h2 className="infoheader">Profile</h2>
            <p><b>{currentUser.username}</b></p>
        </div>
    )
}

export default Profile;