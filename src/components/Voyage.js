import "../App.css";
import React, { useState } from "react";
import VoyageService from "../services/voyage.service";
import TicketService from "../services/ticket.service";
import ReservationService from "../services/reservation.service";
import ReactLoading from "react-loading";
import { useEffect } from "react";

const Voyage = ({
  route_id,
  departure,
  arrival,
  departure_time,
  quantity,
  onSale,
  editPopUp,
  popUp,
  setEditPopUp,
  currentUser,
  setGlobalArrival,
  setGlobalDeparture,
  setDate,
  setVoyageID,
  setQuantity,
  setOnSale,
  _ticket_id,
  left_ticket,
  setLeftTicket,
  setTicketID,
  ticket_price,
  setTicketPrice,
  setCurrentUser,
  setBuyPopUp
}) => {
  const _date = new Date(departure_time);
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
  const [isVisible, setIsVisible] = useState(true);
  const [_loading, _setLoading] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingSale, setLoadingSale] = useState(false);
  const [_onSale, set_onSale] = useState(onSale);
  const [localPrice, setLocalPrice] = useState(0);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(left_ticket);
  const [error, setError] = useState("");
  const handleRemove = async (e) => {
    setLoadingRemove(true);
    await TicketService.deleteTicket(_ticket_id).then(
      (response) => {},
      (error) => {
        setIsVisible(true);
        console.log(error);
      }
    );
    await VoyageService.deleteVoyage(route_id).then(
      (response) => {
        setIsVisible(false);
      },
      (error) => {
        setIsVisible(true);
        console.log(error);
        return;
      }
    );

    setLoadingRemove(false);
  };
  useEffect(() => {
    
    _setLoading(true);
    setError("");
    async function fetchTicket(_ticket_id) {
      await TicketService.getTicket(_ticket_id).then(
        (response) => {
          setLocalPrice(response.data["price"]);
          _setLoading(false);
        },
        (error) => {
          _setLoading(false);
          console.log(error);
        }
      );
    }
    fetchTicket(_ticket_id);
  }, [_ticket_id, setTicketPrice]);

  const handleSale = async (e) => {
    setLoadingSale(true);
    await VoyageService.updateVoyage(
      route_id,
      departure,
      arrival,
      departure_time,
      quantity,
      !_onSale,
      left_ticket,
      _ticket_id
    )
      .then((response) => {
        set_onSale(!_onSale);
        if (response.status === 200) {
          setEditPopUp(false);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return resMessage;
      });

    setLoadingSale(false);
  };
  
  const handleBuy = async (e) => {
    /*
    if (currentUser) {
      setLoadingBuy(true);
      await ReservationService.createReservation(
        currentUser.id,
        "titanic",
        route_id,
        _ticket_id,
        localPrice,
        departure_time,
        "never",
        "premium",
        1
      )
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser({
              ...currentUser,
              balance: currentUser.balance - localPrice,
            });
          }
          setLocalQuantity(localQuantity - 1);
          setError("");
          setLoadingBuy(false);

        })
        .catch((error) => {
          
          setLoadingBuy(false);
          setError(error.message)
        });
    }
    */
    setGlobalArrival(arrival);
    setGlobalDeparture(departure);
    setDate(_date);
    setVoyageID(route_id);
    setQuantity(quantity);
    setOnSale(onSale);
    setTicketID(_ticket_id);
    setLeftTicket(left_ticket);
    setTicketPrice(localPrice);
    
  };
  const handleEdit = async (e) => {
    setGlobalArrival(arrival);
    setGlobalDeparture(departure);
    setDate(_date);
    setVoyageID(route_id);
    setQuantity(quantity);
    setOnSale(onSale);
    setTicketID(_ticket_id);
    setLeftTicket(left_ticket);
    setTicketPrice(localPrice);
    //await fetchTicket(ticket_id);

    setEditPopUp(true);
  };

  return (
    isVisible && (
      <>
        <div
          className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center "
          id={route_id}
        >
          {_loading === false && (
            <header className="jumbotron text-white">
              <div className="d-flex row ">
                <div className="route-item col-xl-6">
                  <h5 className="header-item col-xs-9">Route ID : </h5>
                  <h5 className="valueSpan col-xs-3">
                    <strong className="text-danger">{route_id}</strong>
                  </h5>
                </div>
                <div className="route-item col-xl-6">
                  <h5 className="header-item col-xs-9">Left : </h5>
                  <h5 className="valueSpan col-xs-3">
                    <strong className="text-green">{localQuantity}</strong>
                  </h5>
                </div>
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
              <div className="route-item ">
                <h5 className="header-item col-xs-9">Price:</h5>
                <h5 className="valueSpan  col-xs-3">
                  <strong className="text-green">{localPrice}$</strong>
                </h5>
              </div>
              {currentUser && currentUser.authority_level === "admin" && (
                <div className="d-flex ">
                  <button
                    className="btn  btn-block m-1 remove "
                    onClick={handleRemove}
                    disabled={editPopUp || popUp}
                  >
                    <span>Remove</span>
                    {loadingRemove && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </button>

                  <button
                    className="m-1 sale"
                    onClick={handleSale}
                    disabled={editPopUp || popUp}
                    style={{
                      backgroundColor: _onSale ? "#A94442" : "",
                      color: _onSale ? "white" : "",
                    }}
                  >
                    {!_onSale ? "Sale" : "UnSale"}{" "}
                    {loadingSale && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </button>
                  <button
                    className="m-1"
                    disabled={editPopUp || popUp}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              )}
              {currentUser && currentUser.authority_level === "user" && (
                <div className="row justify-content-md-center m-2">
                  <button className="m-1" onClick={handleBuy}>
                    BUY{" "}
                    {loadingBuy && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {error.length > 0  && (
                      <span className="text-danger" >{error}</span>
                    )}
                  </button>
                </div>
              )}
            </header>
          )}
          {_loading === true && (
            <ReactLoading
              className=" d-flex justify-content-center align-items-center"
              type="spin"
              color="#FF6100"
              height={50}
              width={50}
            />
          )}
        </div>
      </>
    )
  );
};

export default Voyage;
