import React from 'react';
import { Link } from 'react-router-dom';

function RegisterButton() {
    return (
        <div>
            <button className="nav-button">
                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    )
}

export default RegisterButton;