import "./App.css";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import useToken from "./services/useToken";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";



function App() {
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken("null");
  };

  // Use the custom hook to get the validity of the token
  const isValid = false;

  return (
    <div className="App">
      {!isValid && <Login setToken={setToken} />}
      {isValid && (
        <div className="wrapper">
          <h1>Application</h1>
          <button onClick={handleLogout}> Log Out</button>
          <BrowserRouter>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;