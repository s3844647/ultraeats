import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//front-end class for login functionality
class Login extends Component {

    render() {
        return (
            <div className="login-wrapper">
                <h2 class="infoheader">Log in</h2>
                <form>
                    <div class="form-group p-2">
                        <label>
                            <input type="text" class="form-control-lg" placeholder="Username" />
                        </label>
                    </div>
                    <div class="form-group p-2">
                        <label>
                            <input type="password" class="form-control-lg" placeholder="Password" />
                        </label>
                    </div>
                    <div class="form-group p-2">
                        <button type="submit" class="btn-lg btn-info">Submit</button>
                    </div>
                </form>
                <div align="center" className="mt-2">
                    <i>Don't have an account? </i>
                    <a style={{color: "midnightblue"}} align="center" href="/register"><i>Register now</i></a>
                </div>
            </div>
        )
    }
}

export default Login;