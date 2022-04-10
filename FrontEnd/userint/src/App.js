import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import LandingPage from "./components/publicPages/LandingPage";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage/>} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;
