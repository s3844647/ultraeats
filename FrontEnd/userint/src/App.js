import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import LandingPage from "./components/publicPages/LandingPage";
import Login from "./components/publicPages/Login";
import Register from "./components/publicPages/Register";
import Profile from "./components/privatePages/Profile";
import BoardUser from "./components/privatePages/BoardUser";
import BoardAdmin from "./components/privatePages/BoardAdmin";
import BoardModerator from "./components/privatePages/BoardModerator";
import { clearMessage } from "./actions/messages";
import { history } from "./helpers/history";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    return (
        <Router history={history}>
            <div className="App">
                <Header />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Private Routes */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                    <Route path="/mod" element={<BoardModerator />} />
                    <Route path="/admin" element={<BoardAdmin />} />
                </Routes>
            </div>
        </Router>
    )

}

export default App;
