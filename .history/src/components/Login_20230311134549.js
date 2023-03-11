import React, { useEffect, useState } from "react";
import "../App.css";
var randomEmail = require("random-email");
function Login({event, updateEvent}) {

  function handleEmailChange(e) {
    updateEvent({email : e.target.value});
  }

  function handlePasswordChange(e) {
    updateEvent({password : e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: handle login logic here
  }

  function handleRandomLogin(e) {
    e.preventDefault();
    console.log(randomEmail());
    console.log("dsafas");
  }
  useEffect(() => {
    console.log(randomEmail());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit">Log In</button>
      <label>
        <button type="submit" onChange={handleRandomLogin}>
          Random Login
        </button>
      </label>
    </form>
  );
}

export default Login;
