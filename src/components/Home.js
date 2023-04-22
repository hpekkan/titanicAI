import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({currentUser}) => {
  let navigate = useNavigate();
 
  const handleStart = () => {
    if(currentUser === undefined)
      navigate("/login");
    else
      navigate("/tickets");
  };
  return (
    <div className="containerHome align-items-center">
      <header className="jumbotron">
        <div className="Home">
          <header className="Home-header">
            <h1>Welcome to Our Cruise Booking App</h1>
            <p>Book your dream cruise today!</p>
            <button onClick={handleStart}>Get Started</button>
          </header>
          
        </div>
      </header>
    </div>
  );
};

export default Home;
