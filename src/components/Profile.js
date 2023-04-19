import React, { useEffect, useState } from "react";

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
    }
    window.location.href = "/login";
  }, []);
  return (
    <div className="profileContainer">
      
        <header className="jumbotron ">
          <h3>
          Profile<br/><br/><strong>{currentUser.username}</strong> 
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {access_token.substring(0, 20)} ...{" "}
          {access_token.substring(access_token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.user_id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        &nbsp;
        {currentUser.authority_level}
      
    </div>
  );
};

export default Profile;
