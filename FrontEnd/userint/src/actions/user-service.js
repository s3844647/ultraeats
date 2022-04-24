import axios from "axios";
import authHeader from "./auth-header";

const userMicroApi = "http://localhost:2000/api/users/";

const getPublicContent = () => {
    return axios.get(userMicroApi + "all");
};

const getUserBoard = () => {
    return axios.get(userMicroApi + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(userMicroApi + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(userMicroApi + "admin", { headers: authHeader() });
};

export default { getPublicContent, getUserBoard, getModeratorBoard, getAdminBoard };