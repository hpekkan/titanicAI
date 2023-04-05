import axios from "axios";
import UserService from "./user.service";
const API_URL = "http://127.0.0.1:8000/";

const register = async (username, email, password) => {
  const response =  axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
  return response;
  
};
const getToken = () => {
  return JSON.parse(localStorage.getItem("tokens")).access_token;
};

const login = (username, password) => {
  var formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return axios.post(API_URL + "login", formData).then((response) => {
    console.log(response.data.access_token);
    if (response.data.access_token) {
      localStorage.setItem("tokens", JSON.stringify(response.data));
    }
    return response.data;
  });
};
const refresh = (refresh_token) => {
  var formData = new FormData();
  formData.append("refresh", refresh_token);
  return axios.post(API_URL + "refresh", formData).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem("tokens", JSON.stringify(response.data));
    }
    return response.data;
  });
};
const logout = () => {
  localStorage.removeItem("tokens");
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = await UserService.getUser();
  return user.data;
};

const AuthService = {
  register,
  login,
  logout,
  getToken,
  getCurrentUser,
  refresh,
};

export default AuthService;
