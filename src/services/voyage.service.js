import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
import TicketService from "./ticket.service";
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
  try {
    let response = await axios.post(
      API_URL + "voyages",
      {
        departure_location: departure,
        arrival_location: arrival,
        departure_time: date,
        ticket_quantity: quantity,
        onSale: onSale,
        left_ticket: quantity,
      },
      {
        headers: authHeader(),
      }
    );
    if (response.status === 404) {
      return response;
    }
    if (response.status === 401 || response.status === 403) {
      const localToken = localStorage.getItem("tokens");

      if (localToken) {
        const refresh_token = JSON.parse(localToken).refresh_token;

        if (refresh_token) {
          await AuthService.refresh();
          response = await axios.post(
            API_URL + "voyages",
            {
              departure_location: departure,
              arrival_location: arrival,
              departure_time: date,
              ticket_quantity: quantity,
              onSale: onSale,
              left_ticket: quantity,
            },
            {
              headers: authHeader(),
            }
          );

          if (response.status === 401) {
            AuthService.logout();
          }
          if (response.status === 200) {
            await TicketService.createTicket(
              response.data.id,
              departure,
              arrival,
              date,
              quantity,
              "never",
              "1",
              100
            );
          }
        }
      } else if (response.status === 403) {
        AuthService.logout();
        return null;
      }
    } else if (response.status === 200) {
      await TicketService.createTicket(
        response.data.id,
        departure,
        arrival,
        date,
        quantity,
        "never",
        "1",
        100
      );
    }

    return response;
  } catch (error) {
    // Handle any errors that occur during the createVoyage process
    throw new Error("Failed to create voyage");
  }
};


const updateVoyage = async (
  route_id,
  departure,
  arrival,
  date,
  quantity,
  onSale,
  left_ticket,
  ticket_id 
) => {
  try {
    const response = await axios.put(
      API_URL + "voyages",
      {
        route_id: route_id,
        departure_location: departure,
        arrival_location: arrival,
        departure_time: date,
        ticket_quantity: quantity,
        onSale: onSale,
        left_ticket: left_ticket,
        ticket_id: ticket_id,
      },
      {
        headers: authHeader(),
      }
    );

    if (response.status === 401 || response.status === 403) {
      const localToken = localStorage.getItem("tokens");

      if (localToken) {
        const refresh_token = JSON.parse(localToken).refresh_token;

        if (refresh_token) {
          await AuthService.refresh();
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
        }
      } else if (response.status === 403) {
        AuthService.logout();
        return null;
      }
    }

    return response;
  } catch (error) {
    // Handle any errors that occur during the updateVoyage process
    throw new Error("Failed to update voyage");
  }
};

const VoyageService = {
  getVoyages,
  deleteVoyage,
  createVoyage,
  updateVoyage,
};
export default VoyageService;
