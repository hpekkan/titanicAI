import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUser = async () => {
  const response = await axios.get(API_URL + "me", { headers: authHeader() });
  return response;
};

const UserService = {
  getPublicContent,
  getUser,
};

export default UserService;
