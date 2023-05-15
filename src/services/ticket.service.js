import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
import VoyageService from "./voyage.service";
const API_URL = "/api/";

const createTicket = async (
  route_id,
  departure_location,
  arrival_location,
  departure_time,
  ticket_quantity,
  return_date,
  ticket_type,
  price
) => {
  try {
    const response = await axios.post(
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

    if (response.status === 401 || response.status === 403) {
      const localToken = localStorage.getItem("tokens");

      if (localToken) {
        const refresh_token = JSON.parse(localToken).refresh_token;

        if (refresh_token) {
          const refresh_response = await AuthService.refresh();
          if (refresh_response.status === 200) {
            const newResponse = await axios.post(
              API_URL + "ticket",
              {
                route_id: route_id,
                departure_location: departure_location,
                arrival_location: arrival_location,
                departure_date: departure_time,
                return_date: "never",
                ticket_type: ticket_type,
                price: price,
              },
              { headers: authHeader() }
            );
            if (newResponse.status === 200) {
              await VoyageService.updateVoyage(
                route_id,
                departure_location,
                arrival_location,
                departure_time,
                ticket_quantity,
                true,
                ticket_quantity,
                newResponse.data.id
              );
            }
            if (newResponse.status === 401) {
              AuthService.logout();
            }
          }
        } else if (response.status === 403) {
          AuthService.logout();
          return null;
        }
      }
    }
    if (response.status === 200) {
      VoyageService.updateVoyage(
        route_id,
        departure_location,
        arrival_location,
        departure_time,
        ticket_quantity,
        true,
        ticket_quantity,
        response.data.id
      );
    }

    return response;
  } catch (error) {
    // Handle any errors that occur during the createTicket process
    throw new Error("Failed to create ticket");
  }
};
const updateTicket = async (
  ticket_id,
  route_id,
  departure_location,
  arrival_location,
  departure_time,
  return_date,
  ticket_type,
  price
) => {
  try {
     const response = await axios.put(
      API_URL + "ticket",
      {
        ticket_id: ticket_id,
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
    return response;
  } catch (error) {
    throw new Error("Failed to update ticket");
  }
};

const getTicket = async (ticket_id) => {
  try {
    const response = await axios.get(API_URL + "ticket/" + ticket_id);
    return response;
  } catch (error) {
    throw new Error("Failed to get ticket");
  }
};
const getTickets = async () => {
  try {
    const response = await axios.get(API_URL + "tickets", {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    throw new Error("Failed to get tickets");
  }
};
const deleteTicket = async (ticket_id) => {
  try {
    const response = await axios.delete(API_URL + "ticket/" + ticket_id, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    throw new Error("Failed to delete ticket");
  }
};


const TicketService = {
  createTicket,
  updateTicket,
  getTicket,
  getTickets,
  deleteTicket
};
export default TicketService;
