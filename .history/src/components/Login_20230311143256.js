import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
var randomEmail = require("random-email");

function Login({ event, updateEvent }) {
  function handleEmailChange(e) {
    updateEvent({ email: e.target.value });
  }

  function handlePasswordChange(e) {
    updateEvent({ password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: handle login logic here
  }
  const generatePassword = () => {
    // Create a random password
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    // Set the generated password as state
    return randomPassword;
  };
  function handleRandomLogin(e) {
    e.preventDefault();
    updateEvent({ email: randomEmail({ domain: "gmail.com" }) });
    updateEvent({
      password: generatePassword()
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Login;
