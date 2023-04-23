import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
const Payment = () => {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("currentUser") === null)
      window.location.href = "/login";
    else {
      const currentUserLocal = localStorage.getItem("currentUser");
      if (currentUserLocal) {
        const currentParsedLocal = JSON.parse(currentUserLocal);
        if (currentParsedLocal) setCurrentUser(currentParsedLocal);
      }
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    console.log(currentUser);
    setLoading(true);
    await UserService.addBalance(100);
    setLoading(false);
  };
  return (
    <div className="d-flex">
      <div className="profileContainer col-xl-4">
        <header className="jumbotron ">
          <h2>
            <p>
              <strong>Balance:</strong> {currentUser.balance}$
            </p>
            <br />
            <br />
            <strong>{currentUser.username}</strong>
          </h2>
        </header>
      </div>
      <div className="profileContainer col-xl-8 d-flex">
        <header className="jumbotron ">
          <h3>ADD BALANCE &nbsp;</h3>
        </header>
        <button
          className="btn btn-success btn-block"
          disabled={loading}
          onClick={handleClick}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>ADD 100$</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;
