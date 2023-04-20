import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
const API_URL = "http://127.0.0.1:8000/";

const getVoyages = async () => {
  const response = await axios.get(API_URL + "voyages", {
    headers: authHeader(),
  });
  if (response.status === 401) {
    AuthService.refresh();
    const newResponse = await axios.get(API_URL + "voyages", {
      headers: authHeader(),
    });
    if (newResponse.status === 401) {
      AuthService.logout();
    }
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
};

const deleteVoyage = async (id) => {
  const response = await axios.delete(API_URL + "voyages/" + id, {
    headers: authHeader(),
  });
  if (response.status === 401) {
    const localToken = localStorage.getItem("tokens");

    if(localToken){
      const refresh_token = JSON.parse(localToken).refresh_token;
      if (refresh_token) {
        await AuthService.refresh(refresh_token);
        const newResponse = await axios.delete(API_URL + "voyages/" + id, {
            headers: authHeader(),
          });
          if (newResponse.status === 401) {
            AuthService.logout();
            return null;
          }else if (response.status === 403) {
            AuthService.logout();
            return null;
          }
      }
      
    }
    
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
};

const createVoyage = async (departure,arrival,date) => {
  const response = await axios.post(API_URL + "voyages", {'departure_location':departure, 'arrival_location':arrival, "departure_time":date}, {
    headers: authHeader(),
  });
  if (response.status === 401) {
    AuthService.refresh();
    const newResponse = await axios.post(API_URL + "voyages", {'departure_location':departure, 'arrival_location':arrival, "departure_time":date}, {
      headers: authHeader(),
    });
    if (newResponse.status === 401) {
      AuthService.logout();
    }
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
}


const VoyageService = {
  getVoyages,
  deleteVoyage,
  createVoyage
};
export default VoyageService;
