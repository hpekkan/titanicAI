import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
const Payment = ({ currentUser, setCurrentUser, balance,setBalance }) => {
  const [currentUserLocal, setCurrentUserLocal] = useState("");
  useEffect(() => {
    if (localStorage.getItem("currentUser") === null)
      window.location.href = "/login";
    else {
      const _currentUser = localStorage.getItem("currentUser");
      if (_currentUser) {
        const currentParsedLocal = JSON.parse(_currentUser);
        if (currentParsedLocal) setCurrentUserLocal(currentParsedLocal);
      }
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await UserService.addBalance(100);
    setBalance(balance + 100);
    setCurrentUser({
      ...currentUser,
      balance: currentUser.balance + 100,
    });
    setLoading(false);
  };
  return (
    <div className="d-flex">
      <div className="profileContainer col-xl-4">
        <header className="jumbotron ">
          <h2>
            <p>
              <strong >Balance:</strong> <span className="text-success">{balance}$</span>
            </p>
            <br />
            <br />
            <strong className="text-warning">{currentUserLocal.username}</strong>
            <div className="d-flex justify-content-center align-items-center m-5">
              <h5>
                <span className="text-danger">Warning:</span> Please note that
                the balance displayed on this website is solely for
                demonstration purposes and is not reflective of real financial
                transactions. The balance is artificially generated and does not
                represent actual monetary value.
              </h5>
            </div>
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
