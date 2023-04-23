import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";
import Voyage from "./Voyage";

const Payment = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [access_token, setAccessToken] = useState("");
  useEffect(() => {
    const localToken = localStorage.getItem("tokens");
    if (localToken) {
      const access_tokenLocal = JSON.parse(localToken).access_token;
      if (access_tokenLocal) {
        setAccessToken(access_tokenLocal);
        const currentUserLocal = localStorage.getItem("currentUser");
        if (currentUserLocal) {
          const currentParsedLocal = JSON.parse(currentUserLocal);
          if (currentParsedLocal) setCurrentUser(currentParsedLocal);
        }
      }
      return;
    }
    window.location.href = "/login";
  }, []);

  let navigate = useNavigate();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("currentUser") === null)
        await navigate("/login");
      setLoading(true);
      /*await VoyageService.getVoyages().then(
        (response) => {
          if (response.data["Voyages"] === undefined) {
            setContent([]);
          } else setContent(response.data["Voyages"]);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setContent(_content);
        }
      );*/
      setLoading(false);
    }
    fetchData();
  }, [navigate]);
  const handleClick = async () => {
    setLoading(true);
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
        <button className="btn btn-success btn-block" disabled={loading}>
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
