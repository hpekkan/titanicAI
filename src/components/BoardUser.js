import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";

import { useNavigate } from "react-router-dom";
const BoardUser = ({ currentUser,setCurrentUser }) => {
  let navigate = useNavigate();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  
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
        <h3>Tickets</h3>
        <button className="refresh-button" onClick={refreshForms}>
          🔄
        </button>
      </header>
      <div className=" voyages d-flex flex-wrap align-content-center justify-content-center ">
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
            />
          ))}
      </div>
    </div>
  );
};

export default BoardUser;
