import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { register } from '../../actions/auth';

const Register = () => {
    const form = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountType, setAccountType] = useState("USER");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const validator = useRef(new SimpleReactValidator());

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    };
    const onChangeAccountType = (e) => {
        const accountType = e.target.value;
        setAccountType(accountType);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if (validator.current.allValid()) {
            dispatch(register(username, email, password, confirmPassword, accountType))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <div className="login-wrapper">
            <h2 className="infoheader">Register</h2>
            <form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div className="form-group p-2">
                            <label>
                                <input type="text" className="form-control-lg" placeholder="Username"
                                    name="username" value={username} onChange={onChangeUsername}
                                    onBlur={() => validator.current.showMessageFor('username')} required />
                                {validator.current.message('username', username, 'required|min:7')}
                            </label>
                        </div>
                        <div className="form-group p-2">
                            <label>
                                <input type="email" className="form-control-lg" placeholder="Email"
                                    name="email" value={email} onChange={onChangeEmail}
                                    onBlur={() => validator.current.showMessageFor('email')} required />
                                {validator.current.message('email', email, 'required|email')}
                            </label>
                        </div>
                        <div className="form-group p-2">
                            <label>
                                <input type="password" className="form-control-lg" placeholder="Password"
                                    name="password" value={password} onChange={onChangePassword}
                                    onBlur={() => validator.current.showMessageFor('password')} required />
                                {validator.current.message('password', password, 'required|min:7')}
                            </label>
                        </div>
                        <div className="form-group p-2">
                            <label>
                                <input type="password" className="form-control-lg" placeholder="Confirm Password"
                                    name="confirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword}
                                    onBlur={() => validator.current.showMessageFor('confirmPassword')} required />
                                {validator.current.message('confirmPassword', confirmPassword, 'required|min:7')}
                                {validator.current.message('confirmPassword', confirmPassword, `required|in:${password}`, { messages: { in: 'The passwords need to match.' } })}

                            </label>
                        </div>
                        <div className="form-group p-2">
                            <label>
                                <select className="form-control-lg" name="accountType" id="accountType"
                                    onChange={onChangeAccountType} required>
                                    <option value="USER">Basic User</option>
                                    <option value="MODERATOR">Moderator</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group p-2">
                            <button type="submit" className="btn-lg btn-info">Create account</button>
                        </div>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </form>
            <div align="center" className="mt-2">
                <i>Already have an account? </i>
                <a style={{ color: "midnightblue" }} align="center" href="/login"><i>Log in now</i></a>
            </div>
        </div>
    )
}

export default Register;