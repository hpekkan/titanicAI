import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";
import AddVoyage from "./AddVoyage";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import EditPopUp from "./EditPopUp";
import TicketService from "../services/ticket.service";
const BoardAdmin = ({ currentUser, logOut }) => {
  let navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const duringPopUp = popUp ? " during-popup" : "";
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [date, setDate] = useState(new Date());
  const [voyage_id, setVoyageID] = useState("");
  const [ticket_id, setTicketID] = useState("");
  const [left_ticket, setLeftTicket] = useState(0);
  const [ticket_price, setTicketPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (localStorage.getItem("currentUser") === null)
        await navigate("/login");
      setLoading(true);
      await VoyageService.getVoyages().then(
        (response) => {
           setContent(response.data["Voyages"]);
        },
        (error) => {
          if (error.response.status === 401 || error.response.status === 403) logOut();
          if (error.response.status === 404 || error.response.status === 500) {
            setContent([]);
            return;
          }
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(_content);
        }
      );
      setLoading(false);
  };
  
  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("currentUser") === null)
        await navigate("/login");
      setLoading(true);
      await VoyageService.getVoyages().then(
        (response) => {
           setContent(response.data["Voyages"]);
        },
        (error) => {
          if (error.response.status === 401 || error.response.status === 403) logOut();
          if (error.response.status === 404 || error.response.status === 500) {
            setContent([]);
            return;
          }
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(_content);
        }
      );
      setLoading(false);
    }
    fetchData();
  }, [logOut, navigate]);
  const refreshForms = async () => {
    await fetchData();
  };
  return (
    <div className=" container text-white ">
      <header className="jumbotronAdmin">
        <h3>Admin Panel</h3>
        <button className="refresh-button" onClick={refreshForms}>
          🔄
        </button>
      </header>
      <div
        className={
          " voyages d-flex flex-wrap align-content-center justify-content-center Checkout" +
          duringPopUp
        }
      >
        {popUp && <PopUp setPopUp={setPopUp} refreshForms={refreshForms} />}
        {editPopUp && (
          <EditPopUp
            setEditPopUp={setEditPopUp}
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
          Object.keys(content).length > 0 &&
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
              editPopUp={editPopUp}
              popUp={popUp}
              setEditPopUp={setEditPopUp}
              currentUser={currentUser}
              setGlobalArrival={setArrival}
              setGlobalDeparture={setDeparture}
              setDate={setDate}
              setVoyageID={setVoyageID}
              setQuantity={setQuantity}
              setOnSale={setOnSale}
              setTicketID={setTicketID}
              setLeftTicket={setLeftTicket}
              setTicketPrice={setTicketPrice}
            />
          ))}
        {currentUser &&
          currentUser.authority_level === "admin" &&
          loading === false && <AddVoyage popUp={popUp} setPopUp={setPopUp} />}
      </div>
    </div>
  );
};

export default BoardAdmin;
