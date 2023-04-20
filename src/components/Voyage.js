import "../App.css";
import React, { useState } from "react";
import VoyageService from "../services/voyage.service";

const Voyage = ({ route_id, departure, arrival, departure_time, popUp,currentUser }) => {
  console.log(currentUser);
  const _date = new Date(departure_time);
  let _mdy =
    _date.getMonth() + 1 + "/" + _date.getDate() + "/" + _date.getFullYear();
  let _hour = _date.getHours() + ":" + _date.getMinutes();
  const [isVisible, setIsVisible] = useState(true);
  const [Sale, setSale] = useState("Sale");
  const [loadingRemove, setLoadingRemove] = useState(false);
  const handleRemove = async (e) => {
    setLoadingRemove(true);
    await VoyageService.deleteVoyage(route_id).then(
      (response) => {
        setIsVisible(false);
      },
      (error) => {
        setIsVisible(true);
        console.log(error);
      }
    );
    setLoadingRemove(false);
  };
  const handleSale = (e) => {
    if (Sale === "Sale") {
      setSale("UnSale");
      document
        .getElementById(route_id)
        .getElementsByClassName("sale")[0].style.backgroundColor = "#A94442";
    } else {
      setSale("Sale");
      document
        .getElementById(route_id)
        .getElementsByClassName("sale")[0].style.backgroundColor = "#4CAF50";
    }
  };
  return (
    isVisible && (
      <>
        <div
          className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center "
          id={route_id}
        >
          <header className="jumbotron text-white">
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
            <div className="route-item ">
              <h5 className="header-item col-xs-9">Date:</h5>
              <h5 className="valueSpan  col-xs-3">
                <strong className="text-green">{_mdy}</strong>
              </h5>
            </div>
            <div className="route-item ">
              <h5 className="header-item col-xs-9">Hour:</h5>
              <h5 className="valueSpan  col-xs-3">
                <strong className="text-green">{_hour}</strong>
              </h5>
            </div>
            {currentUser && currentUser.authority_level === "admin" && 
            <div className="d-flex ">
              <button
                className="btn  btn-block m-1 remove "
                onClick={handleRemove} disabled={popUp}
              >
                <span>Remove</span>
                {loadingRemove && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </button>

              <button className="m-1 sale" onClick={handleSale} disabled={popUp}>
                {Sale}
              </button>
              <button className="m-1" disabled={popUp}>Edit</button>
            </div>
          }
          {currentUser && currentUser.authority_level === "user" && 
            <div className="row justify-content-md-center m-2">
              <button className="m-1">BUY</button>
            </div>
          }
          </header>
        </div>
      </>
    )
  );
};

export default Voyage;
