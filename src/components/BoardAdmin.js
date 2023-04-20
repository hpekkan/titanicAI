import React, { useState, useEffect } from "react";
import Voyage from "./Voyage";
import "../App.css";
import UserService from "../services/user.service";
import ReactLoading from "react-loading";

const BoardUser = () => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await UserService.getVoyages().then(
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
    <div className="container">
      <header className="jumbotronAdmin">
        <h3>Admin Panel</h3>
        <button className="refresh-button" onClick={refreshForms}>
          🔄
        </button>
      </header>
      <div className="voyages d-flex flex-wrap align-content-center justify-content-center">
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
          content.map(function (route) {
            return (
              <Voyage
                key={route.route_id}
                route_id={route.route_id}
                departure={route.departure_location}
                arrival={route.arrival_location}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BoardUser;
