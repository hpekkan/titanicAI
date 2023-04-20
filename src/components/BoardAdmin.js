import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState({});
  useEffect(() => {
    UserService.getVoyages().then(
      (response) => {
        setContent(response.data["Voyages"]);
        console.log(response.data["Voyages"]);
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
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Panel</h3>
      </header>
      <div className="voyages">
        
        {content.map(route => (
        
          <Voyage key={route.route_id} route_id={route.route_id} departure={route.departure_location} arrival={route.arrival_location} />
        
      ))}
      </div>
    </div>
  );
};

export default BoardUser;
