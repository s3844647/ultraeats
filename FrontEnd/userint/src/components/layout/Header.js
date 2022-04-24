import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from './UltraEats logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../actions/auth";
import EventBus from "../../helpers/EventBus";

const Header = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.accountType === "MODERATOR");
            setShowAdminBoard(currentUser.accountType === "ADMIN");
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }

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
                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to="/mod" className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                <b>User</b>
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (<div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                <b>Welcome, {currentUser.username}</b>
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