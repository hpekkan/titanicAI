import "../App.css";
import React, {  } from "react";
import ReactLoading from "react-loading";

const Ticket = ({
  key,
              reservation_id,
              user_id,
              departure_date,
              ship_name,
              route_id,
              left_ticket,
              _ticket_id,
              price,
              return_date,
              cabin_type,
              cabin_number,
              payment_id,
              currentUser
}) => {
  const _date = new Date(departure_date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes()
    )
  );
  let _mdy =
    utcDate.getMonth() +
    1 +
    "/" +
    utcDate.getDate() +
    "/" +
    utcDate.getFullYear();
  let _hour = utcDate.getHours() + ":" + utcDate.getMinutes();
 

  return (
    <>
      <div
        className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center "
        id={reservation_id}
        key={reservation_id}
      >
        { (
          <header className="jumbotron text-white">
          <div className="d-flex row ">
              <div className="route-item col-xl-6">
                <h5 className="header-item col-xs-9">Ticket ID : </h5>
                <h5 className="valueSpan col-xs-3">
                  <strong className="text-danger">{_ticket_id}</strong>
                </h5>
              </div>
              <div className="route-item col-xl-6">
                <h5 className="header-item col-xs-9">Route ID : </h5>
                <h5 className="valueSpan col-xs-3">
                  <strong className="text-danger">{route_id}</strong>
                </h5>
              </div>
            </div>
            <div className="route-item ">
              <h5 className="header-item col-xs-9">Departure: </h5>
              <h5 className="valueSpan  col-xs-3">
                <strong className="text-green">{"s"}</strong>
              </h5>
            </div>
            <div className="route-item ">
              <h5 className="header-item col-xs-9">Arrival:</h5>
              <h5 className="valueSpan  col-xs-3">
                <strong className="text-danger">{"b"}</strong>
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
            <div className="route-item ">
              <h5 className="header-item col-xs-9">Price:</h5>
              <h5 className="valueSpan  col-xs-3">
                <strong className="text-green">{price}$</strong>
              </h5>
            </div>
          </header>
        )}
        
      </div>
    </>
  );
};

export default Ticket;
