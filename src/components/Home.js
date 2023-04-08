import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleStart = () => {
    navigate("/user");
  };
  return (
    <div className="container">
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
