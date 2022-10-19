import { post } from '../utils/httpClient';

const API_URL = "/auth/";

const register = (username, email, password, birthDate) => {
    return post(API_URL + "signup", {
        username,
        email,
        password,
        birthDate,
    });
};

const login = (username, password) => {
    return post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.accessToken) {
                localStorage.setItem("user", JSON.stringify(response));
            }

            return response;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;