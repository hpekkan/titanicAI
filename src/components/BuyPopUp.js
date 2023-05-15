import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import ReservationService from "../services/reservation.service";
import SvgComponent from "./shipSvg";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const valueRequired = (value) => {
  if (value < 0) {
    return (
      <div className="alert alert-danger" role="alert">
        This field must be positive or zero!
      </div>
    );
  }
};

const BuyPopUp = (props) => {
  const {
    setBuyPopUp,
    currentUser,
    refreshForms,
    departure,
    setDeparture,
    arrival,
    setArrival,
    date,
    voyage_id,
    setVoyageID,
    ticket_id,
    setTicketID,
    left_ticket,
    setLeftTicket,
    quantity,
    setQuantity,
    onSale,
    setOnSale,
    ticket_price,
    setTicketPrice,
    route_id
  } = props;
  const _date = new Date(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes()
    )
  );
  const form = useRef();
  const checkBtn = useRef();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localLoadingEdit, setLocalLoadingEdit] = useState(false);
  const [pass_id, setPassID] = useState(currentUser.user_id);
  const [pclass, setPClass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const [sibsp, setSibsp] = useState("");
  const [parch, setParch] = useState("");
  const [ticket, setTicket] = useState(ticket_id);
  const [fare, setFare] = useState("");
  const [cabin, setCabin] = useState("");
  const [embarked, setEmbarked] = useState("");
  const [seatSelecting, setSeatSelecting] = useState(false);
  const onChangePassID = (e) => {
    const pass_id = e.target.value;
    setPassID(pass_id);
  };
  const onChangePClass = (e) => {
    const pclass = e.target.value;
    setPClass(pclass);
  };
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeSex = (e) => {
    const sex = e.target.value;
    setSex(sex);
  };
  const onChangeAge = (e) => {
    const age = e.target.value;
    setAge(age);
  };
  const onChangeSibsp = (e) => {
    const sibsp = e.target.value;
    setSibsp(sibsp);
  };

  const onChangeParch = (e) => {
    const parch = e.target.value;
    setParch(parch);
  };

  const onChangeTicket = (e) => {
    const ticket = e.target.value;
    setTicket(ticket);
  };

  const onChangeFare = (e) => {
    const fare = e.target.value;
    setFare(fare);
  };

  const onChangeCabin = (e) => {
    const cabin = e.target.value;
    setCabin(cabin);
  };
  const onChangeEmbarked = (e) => {
    const embarked = e.target.value;
    setEmbarked(embarked);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        const response = await ReservationService.createReservation(
          currentUser.user_id,
          "titanic",
          route_id,
          ticket_id,
          ticket_price,
          date,
          "never",
          pclass,
          firstName,
          sex,
          age,
          sibsp,
          parch,
          ticket,
          fare,
          cabin,
          embarked);
        if (response.status === 200) {
          setMessage("Reservation successful!");
          setLocalLoading(false);
          setBuyPopUp(false);
          refreshForms();
        }
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="PopUp d-flex justify-content-center align-items-center h-75">
      {seatSelecting === false && (
        <Form
          onSubmit={handleSubmit}
          ref={form}
          className="overflow-auto d-flex flex-row"
        >
          <div>
            <div className="form-group">
              <button
                className="btn btn-warning btn-block  m-2"
                disabled={localLoading}
                onClick={() => {
                  setSeatSelecting(true);
                }}
              >
                <span>Select Seat</span>
              </button>
            </div>
            <div className="form-group ">
              <label htmlFor="Pass_id">Pass_id</label>
              <Input
                type="text"
                className="form-control"
                name="pass_id"
                value={pass_id}
                onChange={onChangePassID}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pclass">pclass</label>
              <Input
                type="text"
                className="form-control"
                name="pclass"
                value={pclass}
                onChange={onChangePClass}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Name</label>
              <Input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={onChangeFirstName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <div className="gender-select" onChange={onChangeSex}>
                <label>
                  <input type="radio" name="gender" value="male" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" /> Female
                </label>
                <label>
                  <input type="radio" name="gender" value="" /> Other
                </label>
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <Input
                type="number"
                className="form-control"
                name="age"
                value={age}
                onChange={onChangeAge}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sibsp">Number of Siblings/Spouses</label>
              <Input
                type="number"
                className="form-control"
                name="sibsp"
                value={sibsp}
                onChange={onChangeSibsp}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="parch">Number of Parents/Children</label>
              <Input
                type="number"
                className="form-control"
                name="parch"
                value={parch}
                onChange={onChangeParch}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ticket">Ticket</label>
              <Input
                type="text"
                className="form-control"
                name="ticket"
                value={ticket}
                onChange={onChangeTicket}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fare">Fare</label>
              <Input
                type="number"
                className="form-control"
                name="fare"
                value={fare}
                onChange={onChangeFare}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cabin">Cabin</label>
              <Input
                type="text"
                className="form-control"
                name="cabin"
                value={cabin}
                onChange={onChangeCabin}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="embarked">Embarked</label>
              <Input
                type="text"
                className="form-control"
                name="embarked"
                value={embarked}
                onChange={onChangeEmbarked}
                validations={[required]}
              />
            </div>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="pu-button-container d-flex justify-content-center align-items-center">
            <div className="d-flex flex-wrap mt-3">
              <button
                className="btn btn-danger btn-block  m-2"
                disabled={localLoading}
                onClick={() => setBuyPopUp(false)}
              >
                <span>Close</span>
              </button>

              <button
                className="btn btn-primary btn-block m-2"
                disabled={localLoading}
                onClick={"s"}
              >
                {localLoadingEdit && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Buy Ticket</span>
              </button>
            </div>
          </div>

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      )}
      {seatSelecting === true && (
        <div className="d-flex flex-row w-100 h-100">
          <div className="col-xl-10 d-flex justify-content-center align-items-center bg-info ">
            <SvgComponent></SvgComponent>
          </div>
          <div className="col-xl-2 d-flex flex-column justify-content-center align-items-center bg-light">
          <h5 className="text-center text-danger">Under Development</h5>
            <div>
            
              <button
                className="btn btn-warning btn-block  m-2 "
                disabled={localLoading}
                onClick={() => {
                  setSeatSelecting(false);
                }}
              >
                <span>Return back</span>
              </button>
            </div>
            <h5>↓Choose Floor↓</h5>
            <div className="d-flex flex-row ">
            
              <button
                className="btn btn-warning btn-block  m-2 "
                disabled={localLoading}
                onClick={() => {
                  setSeatSelecting(false);
                }}
              >
                <span>1</span>
              </button>
              <button
                className="btn btn-warning btn-block  m-2 "
                disabled={localLoading}
                onClick={() => {
                  setSeatSelecting(false);
                }}
              >
                <span>2</span>
              </button>
              <button
                className="btn btn-warning btn-block  m-2 "
                disabled={localLoading}
                onClick={() => {
                  setSeatSelecting(false);
                }}
              >
                <span>3</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/*<Form
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
        <div className="d-flex col-sm-4">
          <div className="form-group ">
            <label htmlFor="ticket_quantity">Ticket Quantity</label>
            <Input
              type="number"
              className="form-control"
              name="ticket_quantity"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              validations={[valueRequired]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="left_ticket">Left Ticket</label>
            <Input
              type="number"
              className="form-control"
              name="left_ticket"
              min="0"
              max={quantity}
              value={left_ticket}
              onChange={(e) => setLeftTicket(e.target.value)}
              validations={[valueRequired]}
            />
          </div>
        </div>
        <div className="d-flex col-sm-4">
        <div className="form-group">
            <label htmlFor="ticket_price">Ticket Price</label>
            <Input
              type="number"
              className="form-control"
              name="ticket_price"
              min="0"
              value={ticket_price}
              onChange={(e) => setTicketPrice(e.target.value)}
              validations={[valueRequired]}
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
        </div>

        <div className="form-group">
          <label htmlFor="date">DateTime</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={startDate}
            onChange={(d) => {
              setStartDate(d);
            }}
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

        <div className="pu-button-container ">
          <div className="d-flex flex-wrap mt-3">
            <button
              className="btn btn-danger btn-block  m-2"
              disabled={localLoading}
              onClick={() => setBuyPopUp(false)}
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
      </Form>*/}
    </div>
  );
};

export default BuyPopUp;
