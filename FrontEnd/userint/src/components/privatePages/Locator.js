import React from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Locator = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            Google Maps page. (Unfinished)
        </div>
    )
}

export default Locator;