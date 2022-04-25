import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from './UltraEats logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../actions/auth";
import EventBus from "../../helpers/EventBus";
import jwt_decode from 'jwt-decode';

const Header = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    var decoded = "";

    if (currentUser) {
        decoded = jwt_decode(currentUser.token);
    }

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
    return (
        <div>
            <nav className="navbar navbar-expand-sm mb-4">
                <div className="container">
                    <React.Fragment>
                        <Link to="/"><img src={logo} width="250" /></Link>
                    </React.Fragment>
                </div>
                <div className="navbar-nav mr-auto">
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/locator"} className="nav-link">
                                <b>Locator</b>
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (<div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                <b>Welcome, {decoded['username']}</b>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div>
                                <button className="nav-button">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        Log out
                                    </a>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>) : (
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><LoginButton /></li>
                            <li className="nav-item"><RegisterButton /></li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    )
}


export default Header;