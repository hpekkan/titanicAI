import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:8000/";

/*user_id: int
    ship_name: str
    route_id: int
    ticket_id: int
    ticket_price: float
    departure_date: datetime.datetime
    return_date: str
    cabin_type: str
    cabin_number: int
    payment_id: int */
const createReservation = async (
    user_id,
  ship_name,
  route_id,
  ticket_id,
  ticket_price,
  departure_date,
  return_date,
  cabin_type,
  cabin_number
) => {
  try {
    const response = await axios.post(
      API_URL + "reservation",
      {
        ship_name: ship_name,
        route_id: route_id,
        ticket_id: ticket_id,
        ticket_price: ticket_price,
        departure_date: departure_date,
        return_date: return_date,
        cabin_type: cabin_type,
        cabin_number: cabin_number
      },
      { headers: authHeader() }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.detail);
  } 
};
const getUserTickets = async () => {
  try {
    const response = await axios.get(API_URL + "user/reservations", {
      headers: authHeader(),
    });
    return response;
  } catch (error) {

    throw new Error("Failed to get user tickets");
  }
};



const ReservationService = {
    createReservation,
    getUserTickets
};
export default ReservationService;
