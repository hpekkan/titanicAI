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
    } else if (newResponse.status === 200) {
      return newResponse;
    }
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
};

const deleteVoyage = async (id) => {
  try {
    let response = await axios.delete(API_URL + "voyages/" + id, {
      headers: authHeader(),
    });

    if (response.status === 401 || response.status === 403) {
      const localToken = localStorage.getItem("tokens");

      if (localToken) {
        const refresh_token = JSON.parse(localToken).refresh_token;

        if (refresh_token) {
          await AuthService.refresh();
          response = await axios.delete(API_URL + "voyages/" + id, {
            headers: authHeader(),
          });

          if (response.status === 401 || response.status === 403) {
            AuthService.logout();
            return null;
          }
        }
      }
    }

    return response;
  } catch (error) {
    // Handle any errors that occur during the deleteVoyage process
    throw new Error("Failed to delete voyage");
  }
};

const createVoyage = async (departure, arrival, date, quantity, onSale) => {
  const response = await axios.post(
    API_URL + "voyages",
    {
      departure_location: departure,
      arrival_location: arrival,
      departure_time: date,
      ticket_quantity: quantity,
      onSale: onSale,
    },
    {
      headers: authHeader(),
    }
  );
  if (response.status === 401) {
    AuthService.refresh();
    const newResponse = await axios.post(
      API_URL + "voyages",
      {
        departure_location: departure,
        arrival_location: arrival,
        departure_time: date,
        ticket_quantity: quantity,
        onSale: onSale,
      },
      {
        headers: authHeader(),
      }
    );
    if (newResponse.status === 401) {
      AuthService.logout();
    }
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
};
const createTicket = async (
  route_id,
  departure_location,
  arrival_location,
  departure_time,
  return_date,
  ticket_type,
  price
) => {
  const response = await axios
    .post(
      API_URL + "ticket",
      {
        route_id: route_id,
        departure_location: departure_location,
        arrival_location: arrival_location,
        departure_date: departure_time,
        return_date: return_date,
        ticket_type: ticket_type,
        price: price,
      },
      { headers: authHeader() }
    )
    .then(async (_response) => {
      if (_response.status === 401) {
        await AuthService.refresh();
        const newResponse = await axios.post(
          API_URL + "ticket",
          {
            route_id: route_id,
            departure_location: departure_location,
            arrival_location: arrival_location,
            departure_date: departure_time,
            return_date: return_date,
            ticket_type: ticket_type,
            price: price,
          },
          { headers: authHeader() }
        );
        if (newResponse.status === 401) {
          AuthService.logout();
        }
      } else if (_response.status === 403) {
        AuthService.logout();
        return null;
      }
      return response;
    });
};
const updateVoyage = async (
  route_id,
  departure,
  arrival,
  date,
  quantity,
  onSale
) => {
  console.log(date);
  const response = await axios.put(
    API_URL + "voyages",
    {
      route_id: route_id,
      departure_location: departure,
      arrival_location: arrival,
      departure_time: date,
      ticket_quantity: quantity,
      onSale: onSale,
    },
    {
      headers: authHeader(),
    }
  );
  if (response.status === 401) {
    AuthService.refresh();
    const newResponse = await axios.put(
      API_URL + "voyages/" + route_id,
      {
        departure_location: departure,
        arrival_location: arrival,
        departure_time: date,
      },
      {
        headers: authHeader(),
      }
    );
    if (newResponse.status === 401) {
      AuthService.logout();
    }
  } else if (response.status === 403) {
    AuthService.logout();
    return null;
  }
  return response;
};

const VoyageService = {
  getVoyages,
  deleteVoyage,
  createVoyage,
  updateVoyage,
  createTicket,
};
export default VoyageService;
