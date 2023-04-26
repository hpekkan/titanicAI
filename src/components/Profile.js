import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoyageService from "../services/voyage.service";
import ReactLoading from "react-loading";
import Voyage from "./Voyage";

const Profile = () => {
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
    }else
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

  return (
    <div className="d-flex">
      <div className="profileContainer col-xl-4">
        <header className="jumbotron ">
          <h3>
            <br />
            <br />
            <strong className="text-warning">{currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong className="text-primary">Token:</strong>{" "}
          {access_token.substring(0, 20)} ...{" "}
          {access_token.substring(access_token.length - 20)}
        </p>
        <p>
          <strong className="text-primary">Id:</strong> {currentUser.user_id}
        </p>
        <p>
          <strong className="text-primary">Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong className="text-primary">Balance:</strong>{" "}
          {currentUser.balance}
        </p>
        <p>
          <strong className="text-primary">Authorities:</strong>{" "}
          {currentUser.authority_level}
        </p>
      </div>
      <div className="profileContainer col-xl-8 d-flex">
        <header className="jumbotron ">
          <h3>MY TICKETS</h3>
        </header>
        <div className=" voyages d-flex flex-wrap align-content-center justify-content-center ">
          {loading === true && (
            <ReactLoading
              className="spinner"
              type="spin"
              color="#FF6100"
              height={50}
              width={50}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
