import axios from "axios";
import UserService from "./user.service";
const API_URL = "https://146.190.176.211/";

const register = async (username, email, password) => {
  console.log(username, email, password);
  try {
    // Send a POST request to register a new user with the provided data
    const response = await axios.post(API_URL + "signup", {
      username:username,
      email:email,
      password:password,
      balance: 100,
    });
    return response;
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.log(error);
    throw new Error(error.response.data.detail);
  }
};

const getToken = () => {
  const tokens = localStorage.getItem("tokens");
  if (!tokens) {
    throw new Error("Tokens not found");
  }
  
  const { access_token } = JSON.parse(tokens).access_token;
  if (!access_token) {
    throw new Error("Access token not found");
  }
  
  return access_token;
};

const getRefreshToken = () => {
  const tokens = localStorage.getItem("tokens");
  if (!tokens) {
    throw new Error("Tokens not found");
  }
  
  const { refresh_token } = JSON.parse(tokens).refresh_token;
  if (!refresh_token) {
    throw new Error("Access token not found");
  }
  
  return refresh_token;
};

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    
    const response = await axios.post(API_URL + "login", formData);
    
    if (response.data.access_token) {
      localStorage.setItem("tokens", JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the login process
    throw new Error("Failed to log in");
  }
};

const refresh = async () => {
  try {
    const _refresh_token =  getRefreshToken();
    const response = await axios.get(API_URL + "refresh", {
      params: {
        refresh_token: _refresh_token
      }
    });
    
    if (response.data.access_token) {
      localStorage.setItem("tokens", JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the token refresh process
    throw new Error("Failed to refresh token");
  }
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
