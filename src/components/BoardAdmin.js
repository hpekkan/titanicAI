import React, { useState, useEffect } from "react";
 import Voyage from "./Voyage";
 import "../App.css";

const BoardUser = () => {
  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Panel</h3>
      </header>
      <div className="voyages">
        <Voyage route_id={1} departure={"Ankara"} arrival={"İstanbul"} />

      </div>
    </div>
  );
};

export default BoardUser;