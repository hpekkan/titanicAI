import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return axios
    .post(API_URL + "login", formData)
    .then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(response.data.refresh_token));
        }
        return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
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