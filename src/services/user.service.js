import axios from "axios";
import authHeader from "./auth-header";
import AuthService  from "./auth.service";
const API_URL = "http://127.0.0.1:8000/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUser = async () => {
  const response = await axios.get(API_URL + "me", { headers: authHeader() });
  if(response.status=== 401 ){
    AuthService.refresh();
    const newResponse = await axios.get(API_URL + "me", { headers: authHeader() });
    if(newResponse.status=== 401 ){
      AuthService.logout();
    }
  }else if (response.status=== 403){
    AuthService.logout();
    return null;
  }
  return response;
};
const getVoyages = async () => {
  const response = await axios.get(API_URL + "voyages", { headers: authHeader() });
  if(response.status=== 401 ){
    AuthService.refresh();
    const newResponse = await axios.get(API_URL + "voyages", { headers: authHeader() });
    if(newResponse.status=== 401 ){
      AuthService.logout();
    }
  }else if (response.status=== 403){
    AuthService.logout();
    return null;
  }
  return response;
};
const UserService = {
  getPublicContent,
  getUser,
  getVoyages,
};

export default UserService;
