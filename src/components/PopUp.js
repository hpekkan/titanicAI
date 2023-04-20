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
  // function that takes boolean as param to conditionally display popup
  let navigate = useNavigate();
  const { setPopUp } = props;
  const form = useRef();
  const checkBtn = useRef();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeDeparture = (e) => {
    const departure = e.target.value;
    setDeparture(departure);
  };

  const onChangeArrival = (e) => {
    const arrival = e.target.value;
    setArrival(arrival);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setLocalLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLocalLoading(false);
    } else {
      setLocalLoading(false);
    }
  };
  return (
    <div className="PopUp">
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
          <label htmlFor="date">DateTime</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
      </Form>
      <div className="pu-button-container">
        <div className="form-group">
          <button
            className="btn btn-danger btn-block  m-2"
            disabled={localLoading}
            onClick={() => setPopUp(false)}
          >
            {localLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
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
    </div>
  );
};

export default PopUp;
