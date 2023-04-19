import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await AuthService.getCurrentUser();
      setCurrentUser(data);
      localStorage.setItem("currentUser", JSON.stringify(data));
      return true;
    }
    const localToken = localStorage.getItem("tokens");
    if (localToken) {
      const access_token = JSON.parse(localToken).access_token;
      if (access_token) fetchData();
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto col-xl-4">
          <Link to={"/"} className="navbar-brand ">
            <h3>TicTanic</h3>
          </Link>

          {currentUser && currentUser.authority_level === "admin" && (
            <li className="nav-item justify-content-center align-self-center">
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>
          )}
          {currentUser && currentUser.authority_level === "user" && (
            <li className="nav-item justify-content-center align-self-center">
              <Link to={"/ticket"} className="nav-link">
                Book a Ticket
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto col-xl-8 justify-content-end  ">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item logout">
              <a href="/login" className="nav-link logout" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto ">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="containerMain ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
