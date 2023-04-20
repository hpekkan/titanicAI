import "../App.css";
import React, { useState, useEffect } from "react";
const Voyage = ({ route_id, departure, arrival }) => {
    const [Sale, setSale] = useState("Sale");

    const handleSale = (e) => {
        if (Sale === "Sale") {
            setSale("UnSale");
            document.getElementById(route_id).getElementsByClassName("sale")[0].style.backgroundColor = "#A94442";
        } else {
            setSale("Sale");
            document.getElementById(route_id).getElementsByClassName("sale")[0].style.backgroundColor = "#4CAF50";
        }
    };
  return (
    <div className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center" id={route_id}>
      <header className="jumbotron">
        <div className="route-item">
          <h5 className="header-item col-xs-9">Route ID : </h5>
          <h5 className="valueSpan col-xs-3">
            <strong>{route_id}</strong>
          </h5>
        </div>
        <div className="route-item ">
          <h5 className="header-item col-xs-9">Departure: </h5>
          <h5 className="valueSpan  col-xs-3">
            <strong className="text-green">{departure}</strong>
          </h5>
        </div>
        <div className="route-item ">
          <h5 className="header-item col-xs-9">Arrival:</h5>
          <h5 className="valueSpan  col-xs-3">
            <strong className="text-danger">{arrival}</strong>
          </h5>
        </div>
        <div className="d-flex">
          <button className="m-1 remove">Remove</button>
          <button className="m-1 sale" onClick={handleSale} >{Sale}</button>
          <button className="m-1">Edit</button>
        </div>
      </header>
    </div>
  );
};

export default Voyage;
