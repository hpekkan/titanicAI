import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";
import BuyPopUp from "./BuyPopUp";

import { useNavigate } from "react-router-dom";
const BoardUser = ({ currentUser,setCurrentUser }) => {
  let navigate = useNavigate();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [buyPopUp, setBuyPopUp] = useState(false);
   const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [date, setDate] = useState(new Date());
  const [voyage_id, setVoyageID] = useState("");
  const [ticket_id, setTicketID] = useState("");
  const [left_ticket, setLeftTicket] = useState(0);
  const [ticket_price, setTicketPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [route_id, setRouteID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("currentUser") === null) navigate("/login");
      setLoading(true);
      await VoyageService.getVoyages().then(
        (response) => {
          if (response.data["Voyages"] === undefined) {
            setContent([]);
          } else setContent(response.data["Voyages"]);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.detail) ||
            error.message ||
            error.toString();
          setContent(_content);
        }
      );
      setLoading(false);
    };
    if(localStorage.getItem("currentUser")===null) navigate("/login");
    fetchData();
  }, [ navigate]);
  const fetchData = async () => {
    if (localStorage.getItem("currentUser") === null) navigate("/login");
    setLoading(true);
    await VoyageService.getVoyages().then(
      (response) => {
        if (response.data["Voyages"] === undefined) {
          setContent([]);
        } else setContent(response.data["Voyages"]);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    setLoading(false);
  };
  const refreshForms = async () => {
    await fetchData();
  };
  return (
    <div className=" container text-white ">
      <header className="jumbotronAdmin">
        <h3>Tickets</h3>
        <button className="refresh-button" onClick={refreshForms}>
          🔄
        </button>
      </header>
      <div className=" voyages d-flex flex-wrap align-content-center justify-content-center ">
      {buyPopUp && (
          <BuyPopUp
            setBuyPopUp={setBuyPopUp}
            refreshForms={refreshForms}
            arrival={arrival}
            departure={departure}
            setArrival={setArrival}
            setDeparture={setDeparture}
            date={date}
            setDate={setDate}
            left_ticket={left_ticket}
            voyage_id={voyage_id}
            setVoyageID={setVoyageID}
            ticket_id={ticket_id}
            quantity={quantity}
            setQuantity={setQuantity}
            onSale={onSale}
            setOnSale={setOnSale}
            setLeftTicket={setLeftTicket}
            ticket_price={ticket_price}
            setTicketPrice={setTicketPrice}
            currentUser={currentUser}
            route_id={route_id}
          />
        )}
        {loading === true && (
          <ReactLoading
            className="spinner"
            type="spin"
            color="#FF6100"
            height={50}
            width={50}
          />
        )}
        {loading === false &&
          content !== undefined &&
          content.map((route) => (
            <Voyage
              key={route.route_id}
              route_id={route.route_id}
              departure={route.departure_location}
              arrival={route.arrival_location}
              departure_time={route.departure_time}
              quantity={route.ticket_quantity}
              onSale={route.onSale}
              left_ticket={route.left_ticket}
              _ticket_id={route.ticket_id}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setBuyPopUp={setBuyPopUp}
              setGlobalArrival={setArrival}
              setGlobalDeparture={setDeparture}
              setDate={setDate}
              setVoyageID={setVoyageID}
              setQuantity={setQuantity}
              setOnSale={setOnSale}
              setTicketID={setTicketID}
              setLeftTicket={setLeftTicket}
              setTicketPrice={setTicketPrice}
              setRouteID={setRouteID}
            />
          ))}
      </div>
    </div>
  );
};

export default BoardUser;
