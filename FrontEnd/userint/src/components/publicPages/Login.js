import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate as Redirect } from 'react-router-dom';
import SimpleReactValidator from "simple-react-validator";
import { login } from "../../actions/auth";

//front-end class for login functionality
const Login = (props) => {
    const form = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const validator = useRef(new SimpleReactValidator());

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        if (validator.current.allValid()) {
            dispatch(login(username, password))
                .then(() => {
                    props.history.push("/profile");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };
    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }
    return (
        <div className="login-wrapper">
            <h2 class="infoheader">Log in</h2>
            <form onSubmit={handleLogin} ref={form}>
                <div class="form-group p-2">
                    <label>
                        <input type="text" class="form-control-lg" placeholder="Username"
                            value={username} onChange={onChangeUsername} required />
                    </label>
                </div>
                <div class="form-group p-2">
                    <label>
                        <input type="password" class="form-control-lg" placeholder="Password"
                            value={password} onChange={onChangePassword} required />
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-lg btn-info" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Log in</span>
                    </button>
                </div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </form>
            <div align="center" className="mt-2">
                <i>Don't have an account? </i>
                <a style={{ color: "midnightblue" }} align="center" href="/register"><i>Register now</i></a>
            </div>
        </div>
    )
}


export default Login;