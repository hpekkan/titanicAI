import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import ReactLoading from "react-loading";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Payment from "./components/Payment";

const App = () => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
 
  useEffect(() => {
    setLoading(true);
    async function logOut() {
      await AuthService.logout();
      setCurrentUser(undefined);
    };
    async function fetchData() {
      try {
        const data = await AuthService.getCurrentUser();
        if(data){
          setCurrentUser(data);
          localStorage.setItem("currentUser", JSON.stringify(data));
          setBalance(data.balance);
          return true;
        }else {
          return false;
        }
       
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    async function refreshToken() {
      try {
        const data = await AuthService.refresh();
        if (data) {
          fetchData();
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        logOut();
        return false;
      }
    }
    if (!fetchData()) refreshToken();
    
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (loading) {
      document.getElementById("App").className = "App fullscreen";
    } else {
      document.getElementById("App").className = "App";
    }
  }, [loading]);
  const logOut = async () => {
    await AuthService.logout();
    setCurrentUser(undefined);
    await navigate("/login");
  };


  return (
    <div className="App " id="App">
      {loading === true && (
        <ReactLoading
          className="spinner"
          type="spin"
          color="#FF6100"
          height={50}
          width={50}
        />
      )}
      {loading === false && (
        <>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto col-xl-4">
              <Link to={"/"} className="navbar-brand ">
                <h3>TicTanic</h3>
              </Link>

              {currentUser && currentUser.authority_level === "admin" && (
                <li className="nav-item justify-content-center align-self-center ">
                  <Link to={"/admin"} className="nav-link ">
                    Admin
                  </Link>
                </li>
              )}
              {currentUser  && currentUser.authority_level === "user" && (
                <li className="nav-item justify-content-center align-self-center">
                  <Link to={"/tickets"} className="nav-link">
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
                <li className="nav-item">
                  <Link to={"/payment"} className="nav-link">
                  <span>Balance:</span> <span className="text-success">{balance}$</span>
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
              <Route path="/" element={<Home currentUser={currentUser}/>} />
              <Route
                path="/login"
                element={<Login loading={loading} setLoading={setLoading}  />}
              />
              <Route path="/register" element={<Register setLoading={setLoading} />} />
              <Route path="/profile" element={<Profile logOut={logOut} balance={balance} setBalance={setBalance}  />} />
              <Route path="/payment" element={<Payment currentUser={currentUser} setCurrentUser={setCurrentUser} balance={balance} setBalance={setBalance} />} />
              <Route
                path="/tickets"
                element={
                  <BoardUser currentUser={currentUser} setCurrentUser={setCurrentUser} logOut={logOut} />
                }
              />
              <Route
                path="/admin"
                element={
                  <BoardAdmin currentUser={currentUser} logOut={logOut} />
                }
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
