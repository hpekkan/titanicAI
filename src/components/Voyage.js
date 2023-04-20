import React, { useState, useEffect } from "react";
import "../App.css";

const Voyage = ({ route_id, departure, arrival }) => {
  return (
    <div className="voyage" key={route_id}>
      <header className="jumbotron">
        <div className="route-item">
          <h5 className="header-item col-sm-9">Route ID : </h5>
          <h6 className="valueSpan col-sm-3">{route_id}</h6>
        </div>
        <div className="route-item ">
          <h5 className="header-item col-sm-9">Departure: </h5>
          <h6 className="valueSpan col-sm-3">{departure}</h6>
        </div>{" "}
        <div className="route-item ">
          <h5 className="header-item col-sm-9">Arrival:</h5>{" "}
          <h6 className="valueSpan col-sm-3">{arrival}</h6>
        </div>
      </header>
    </div>
  );
};

export default Voyage;
