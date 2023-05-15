import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://146.190.176.211/";


/*{
  "user_id": 0,
  "ship_name": "string",
  "route_id": 0,
  "ticket_id": 0,
  "ticket_price": 0,
  "departure_date": "2023-05-15T17:24:37.139Z",
  "return_date": "string",
  "payment_id": 0,
  "pclass": 0,
  "name": "string",
  "sex": "string",
  "age": 0,
  "sibsp": 0,
  "parch": 0,
  "ticket": "string",
  "fare": 0,
  "cabin": "string",
  "embarked": "string"
} */
const createReservation = async (
  user_id,
  ship_name,
  route_id,
  ticket_id,
  ticket_price,
  departure_date,
  return_date,
  pclass,
  name,
  sex,
  age,
  sibsp,
  parch,
  ticket,
  fare,
  cabin,
  embarked
) => {
  try {
    const response = await axios.post(
      API_URL + "reservation",
      {
        user_id: user_id,
        ship_name: ship_name,
        route_id: route_id,
        ticket_id: ticket_id,
        ticket_price: ticket_price,
        departure_date: departure_date,
        return_date: return_date,
        pclass: pclass,
        name: name,
        sex:sex,
        age: age,
        sibsp: sibsp,
        parch: parch,
        ticket: ticket,
        fare: fare,
        cabin: cabin,
        embarked: embarked
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
