import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './UltraEats logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm mb-4">
                    <div className="container">
                        <React.Fragment>
                            <Link to="/"><img src={logo} width="250" /></Link>
                        </React.Fragment>
                    </div>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><LoginButton/></li>
                            <li className="nav-item"><RegisterButton/></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;