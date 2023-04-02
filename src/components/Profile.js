import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState("undefined");
    const [token , setToken] = useState("undefined");
    useEffect( () => {
        async function fetchData() {
            setCurrentUser(await AuthService.getCurrentUser());
            setToken(await AuthService.getToken());
          }
          fetchData();
        
    }, []);

    
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {token.substring(0, 20)} ...{" "}
        {token.substr(token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;