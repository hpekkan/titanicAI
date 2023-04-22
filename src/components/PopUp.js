import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import VoyageService from "../services/voyage.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const PopUp = (props) => {
  const { setPopUp,refreshForms } = props;
  const form = useRef();
  const checkBtn = useRef();
  const [startDate, setStartDate] = useState(
    new Date()
  );
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [onSale, setOnSale] = useState(true);
  const [localLoading, setLocalLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeDeparture = (e) => {
    const departure = (e.target.value.toString()).toUpperCase();
    setDeparture(departure);
  };

  const onChangeArrival = (e) => {
    const arrival = (e.target.value.toString()).toUpperCase();
    setArrival(arrival);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLocalLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      await VoyageService.createVoyage(
        departure,
        arrival,
        startDate,
        quantity,
        onSale
      )
        .then((response) => {
          if (response.status === 200) {
            setPopUp(false);
            refreshForms();
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
    } else {
      setLocalLoading(false);
    }
  };
  return (
    <div className="PopUp d-flex justify-content-center align-items-center overflow-auto h-75">
      <Form onSubmit={handleCreate} ref={form}>
        <div className="form-group">
          <label htmlFor="departure_location">Departure</label>
          <Input
            type="text"
            className="form-control"
            name="departure_location"
            value={departure}
            onChange={onChangeDeparture}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Arrival</label>
          <Input
            type="arrival_location"
            className="form-control"
            name="arrival_location"
            value={arrival}
            onChange={onChangeArrival}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticket_quantity">Ticket Quantity</label>
          <Input
            type="number"
            className="form-control"
            name="ticket_quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <div className="onSale">
            <label>
              <input
                type="checkbox"
                name="gender"
                defaultChecked
                value="Sale"
                onChange={(e) => {
                  setOnSale(e.target.checked);
                }}
              />{" "}
              Start Sale
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date">DateTime</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm"
          />
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />

        <div className="pu-button-container">
          <div className="form-group">
            <button
              className="btn btn-danger btn-block  m-2"
              disabled={localLoading}
              onClick={() => setPopUp(false)}
            >
              <span>Close</span>
            </button>
            <button
              className="btn btn-primary btn-block m-2"
              disabled={localLoading}
            >
              {localLoading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add Voyage</span>
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PopUp;
