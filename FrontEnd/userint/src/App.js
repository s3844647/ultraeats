import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import LandingPage from "./components/publicPages/LandingPage";
import Login from "./components/publicPages/Login";
import Register from "./components/publicPages/Register";
import Profile from "./components/privatePages/Profile";
import Locator from "./components/privatePages/Locator";
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
                    <Route path="/locator" element={<Locator />} />
                </Routes>
            </div>
        </Router>
    )

}

export default App;

