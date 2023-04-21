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

const EditPopUp = (props) => {
  const {
    setEditPopUp,
    refreshForms,
    departure,
    setDeparture,
    arrival,
    setArrival,
    date,
    setDate,
    voyage_id,
    setVoyageID,
    quantity,
    setQuantity,
    onSale,
    setOnSale,
  } = props;
  const form = useRef();
  const checkBtn = useRef();
  const [startDate, setStartDate] = useState(new Date(date));

  const [localLoading, setLocalLoading] = useState(false);
  const [localLoadingEdit, setLocalLoadingEdit] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeDeparture = (e) => {
    const departure = e.target.value;
    setDeparture(departure);
  };

  const onChangeArrival = (e) => {
    const arrival = e.target.value;
    setArrival(arrival);
  };
  const onChangeQuantity = (e) => {
    const arrival = e.target.value;
    setArrival(arrival);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLocalLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      await VoyageService.createVoyage(departure, arrival, startDate, quantity, onSale)
        .then((response) => {
          if (response.status === 200) {
            setEditPopUp(false);
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
  const handleEdit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLocalLoadingEdit(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      await VoyageService.updateVoyage(voyage_id, departure, arrival, startDate, quantity, onSale)
        .then((response) => {
          if (response.status === 200) {
            setEditPopUp(false);
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
      setLocalLoadingEdit(false);
    }
  };
  return (
    <div className="PopUp h-75 overflow-auto">
      <Form
        onSubmit={handleCreate}
        ref={form}
        className="d-flex flex-column justify-content-center align-items-center flex-wrap"
      >
        <span>Voyage ID: {voyage_id}</span>
        <div className="form-group ">
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
          <label htmlFor="arrival_location">Arrival</label>
          <Input
            type="text"
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
                <input type="checkbox" name="gender"  defaultChecked value="Sale" onChange={(e)=>{setOnSale(e.target.checked)}} /> Start Sale
              </label>
            </div>
          </div>
        <div className="form-group">
          <label htmlFor="date">DateTime</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={startDate}
            onChange={(date) => {setStartDate(date);setDate(date);}}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
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

        <div className="pu-button-container ">
          <div className="d-flex flex-wrap mt-3">
            <button
              className="btn btn-danger btn-block  m-2"
              disabled={localLoading}
              onClick={() => setEditPopUp(false)}
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
              <span>Create new Voyage</span>
            </button>
            <button
              className="btn btn-primary btn-block m-2"
              disabled={localLoading}
              onClick={handleEdit}
            >
              {localLoadingEdit && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Edit Voyage</span>
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditPopUp;
