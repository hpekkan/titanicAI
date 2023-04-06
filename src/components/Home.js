import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Home = () => {
  let navigate = useNavigate();
  const [localToken, setLocalToken] = useState("");
  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    const localToken = localStorage.getItem("tokens");
    setLocalToken(localToken);
    if (
      localToken !== null &&
      localToken !== undefined &&
      localToken !== "" &&
      localToken !== "undefined" &&
      localToken !== "null"
    ) {
      const access_token = JSON.parse(localToken).access_token;
      setAccessToken(access_token);
      if (
        access_token !== null &&
        access_token !== undefined &&
        access_token !== "" &&
        access_token !== "undefined" &&
        access_token !== "null"
      ) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [localToken, access_token, navigate]);

  const form = useRef();
  const checkBtn = useRef();

  const [pass_id, setPassID] = useState("");
  const [pclass, setPClass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const [sibsp, setSibsp] = useState("");
  const [parch, setParch] = useState("");
  const [ticket, setTicket] = useState("");
  const [fare, setFare] = useState("");
  const [cabin, setCabin] = useState("");
  const [embarked, setEmbarked] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="jumbotronHome">
      <div className="LeftBody">a</div>
        <Form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
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
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Buy Ticket</span>
            </button>
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
      </header>
    </div>
  );
};

export default Home;
