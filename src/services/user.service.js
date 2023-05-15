import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
const API_URL = "/api";

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
const addBalance = async (amount) => {
  try {
    // Attempt to get user data with authorization header
    const response = await axios.post(API_URL + "addBalance/" + amount, null, {
      headers: authHeader(),
    });
    console.log(response);
    return response;
  } catch (error) {
    // If there's an error, try refreshing the token and retry getting user data
    try {
      await AuthService.refresh();
      const newResponse = await axios.post(
        API_URL + "addBalance/" + amount,
        null,
        { headers: authHeader() }
      );
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
  addBalance,
};

export default UserService;
