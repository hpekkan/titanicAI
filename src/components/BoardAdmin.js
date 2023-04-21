import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";
import AddVoyage from "./AddVoyage";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import EditPopUp from "./EditPopUp";
const BoardAdmin = ({ currentUser }) => {
  let navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const duringPopUp = popUp ? " during-popup" : "";
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [date, setDate] = useState(new Date());
  const [voyage_id, setVoyageID] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
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
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
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
            voyage_id={voyage_id}
            setVoyageID={setVoyageID}
            quantity={quantity}
            setQuantity={setQuantity}
            onSale={onSale}
            setOnSale={setOnSale}
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
              editPopUp={editPopUp}
              setEditPopUp={setEditPopUp}
              currentUser={currentUser}
              setGlobalArrival={setArrival}
              setGlobalDeparture={setDeparture}
              setDate={setDate}
              setVoyageID={setVoyageID}
              setQuantity={setQuantity}
              setOnSale={setOnSale}
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
