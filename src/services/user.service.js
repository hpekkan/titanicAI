import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
const API_URL = "http://127.0.0.1:8000/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUser = async () => {
  try {
    // Attempt to get user data with authorization header
    const response = await axios.get(API_URL + "me", { headers: authHeader() });
    return response;
  } catch (error) {
    // If there's an error, try refreshing the token and retry getting user data
    try {
      await AuthService.refresh();
      const newResponse = await axios.get(API_URL + "me", {
        headers: authHeader(),
      });
      return newResponse;
    } catch (error) {
      // If refreshing token fails, log the user out
      await AuthService.logout();
      throw new Error("Failed to get user data");
    }
  }
};


const UserService = {
  getPublicContent,
  getUser,
};

export default UserService;
