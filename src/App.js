import "./App.css";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import useToken from "./components/useToken";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Define a custom hook that takes a token and returns a boolean indicating if it is valid
const useValidToken = (token) => {
  // Use useState to store the validity of the token
  const [isValid, setIsValid] = useState(false);

  // Use useEffect to check the validity of the token whenever it changes
  useEffect(() => {
    // Define a function that checks the validity of the token
    const checkToken = async () => {
      // Assume there is an API endpoint that validates the token and returns true or false
      const response = await fetch(`/api/validate?token=${token}`);
      const data = await response.json();
      // Set the validity state based on the response
      setIsValid(data.valid);
    };
    // Call the function if the token is not null
    if (token !== "null") {
      checkToken();
    } else {
      // Set the validity state to false if the token is null
      setIsValid(false);
    }
  }, [token]); // Pass the token as a dependency to useEffect

  // Return the validity state
  return isValid;
};

function App() {
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken("null");
  };

  // Use the custom hook to get the validity of the token
  const isValid = useValidToken(token);

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