import axios from "axios";

const userMicroApi = "http://myenvironment1.eba-xjprkmgs.us-east-1.elasticbeanstalk.com/api/users";

const register = (username, email, password, confirmPassword, accountType) => {
    return axios.post(userMicroApi + "register", {username, email, password, confirmPassword, accountType});
};

const login = (username, password) => {
    return axios.post(userMicroApi + "login", {username, password}).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
};

export default {register, login, logout};