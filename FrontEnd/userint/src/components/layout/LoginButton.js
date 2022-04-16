import React from 'react';
import { Link } from 'react-router-dom';

function LoginButton() {
    return (
        <div>
            <button className="nav-button">
                <Link className="nav-link" to="/login">
                    Log in
                </Link>
            </button>
        </div>
    )
}

export default LoginButton;