import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

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
  const localToken = localStorage.getItem("tokens");
  if(localToken) {
    const access_token = JSON.parse(localToken).access_token;
    if (access_token) {
      navigate("/");
    }
  }
 

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [pass_id, setPassID] = useState("");
  const [pclass, setPClass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      <header className="jumbotron">
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
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
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