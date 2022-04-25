import React from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

//user profile
const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/login" />;
    }
    const myToken = currentUser.token;
    var decoded = jwt_decode(myToken);
    //Date values.
    var issuedAtDate = new Date(decoded['iat'] * 1000).toLocaleDateString("en-US") + " " + new Date(decoded['iat'] * 1000).toLocaleTimeString("en-US");
    var expiryDate = new Date(decoded['exp'] * 1000).toLocaleDateString("en-US") + " " + new Date(decoded['exp'] * 1000).toLocaleTimeString("en-US");

    return (
        <div className="container">
            <h2 className="infoheader">Profile</h2>
            <div>
                <div>
                    <b>Token</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {myToken}
                </div>
            </div>
            <div>
                <div>
                    <b>Username</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {decoded['username']}
                </div>
            </div>
            <div>
                <div>
                    <b>Email</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {decoded['email']}
                </div>
            </div>
            <div>
                <div>
                    <b>Password</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {decoded['password']}
                </div>
            </div>
            <div>
                <div>
                    <b>ID</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {decoded['id']}
                </div>
            </div>
            <div>
                <div>
                    <b>Issued at</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {issuedAtDate}
                </div>
            </div>
            <div>
                <div>
                    <b>Expired</b>
                </div>
                <div style={{ overflow: 'auto' }}>
                    {expiryDate}
                </div>
            </div>
        </div>
    )
}

export default Profile;