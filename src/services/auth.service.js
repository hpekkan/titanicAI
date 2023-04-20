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
  console.log("refresh");
  
  return axios.get(API_URL + "refresh?refresh_token=" + refresh_token, 
  ).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem("tokens", JSON.stringify(response.data));
      console.log(response.data);
    }
    return response.data;
  });
};
const logout = () => {
  localStorage.removeItem("tokens");
  localStorage.removeItem("currentUser");

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
