import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationService from "../services/reservation.service";
import Ticket from "./Ticket";
const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [access_token, setAccessToken] = useState("");
  useEffect(() => {
    const localToken = localStorage.getItem("tokens");
    if (localToken) {
      const access_tokenLocal = JSON.parse(localToken).access_token;
      if (access_tokenLocal) {
        setAccessToken(access_tokenLocal);
        const currentUserLocal = localStorage.getItem("currentUser");
        if (currentUserLocal) {
          const currentParsedLocal = JSON.parse(currentUserLocal);
          if (currentParsedLocal) setCurrentUser(currentParsedLocal);
        }
      }
      return;
    } else window.location.href = "/login";
  }, []);

  let navigate = useNavigate();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("currentUser") === null)
        await navigate("/login");
      setLoading(true);
      await ReservationService.getUserTickets().then(
        (response) => {
          if (response.data["reservations"] === undefined) {
            setContent([]);
          } else {
            setContent(response.data["reservations"]);}
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setContent(_content);
        }
      );
      
      setLoading(false);
    }
    fetchData();
  }, [navigate]);

  return (
    <div className="d-flex">
      <div className="profileContainer col-xl-4">
        <header className="jumbotron ">
          <h3>
            <br />
            <br />
            <strong className="text-warning">{currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong className="text-primary">Token:</strong>{" "}
          {access_token.substring(0, 20)} ...{" "}
          {access_token.substring(access_token.length - 20)}
        </p>
        <p>
          <strong className="text-primary">Id:</strong> {currentUser.user_id}
        </p>
        <p>
          <strong className="text-primary">Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong className="text-primary">Balance:</strong>{" "}
          {currentUser.balance}
        </p>
        <p>
          <strong className="text-primary">Authorities:</strong>{" "}
          {currentUser.authority_level}
        </p>
      </div>
      <div className="profileContainer col-xl-8 d-flex">
        <header className="jumbotron ">
          <h3>MY TICKETS</h3>
        </header>
        <div className=" voyages col-xl-12 d-flex flex-wrap align-content-center justify-content-center ">
        {loading === false &&
          content !== undefined &&
          content.map((ticket) => (
            
            <Ticket
              key={ticket.reservation_id}
              reservation_id={ticket.reservation_id}
              user_id={ticket.user_id}
              departure_date={ticket.departure_date}
              ship_name={ticket.ship_name}
              route_id={ticket.route_id}
              left_ticket={ticket.left_ticket}
              _ticket_id={ticket.ticket_id}
              price={ticket.price}
              return_date={ticket.return_date}
              cabin_type={ticket.cabin_type}
              cabin_number={ticket.cabin_number}
              payment_id={ticket.payment_id}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
