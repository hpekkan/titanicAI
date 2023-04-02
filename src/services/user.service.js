import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUser = async () => {
  return await axios.get(API_URL + "me", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUser,
};

export default UserService;