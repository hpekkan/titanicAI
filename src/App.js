import './App.css';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import useToken from './components/useToken';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';



function App() {
  const { token, setToken } = useToken();
  const [isLogged, setIsLogged] = useState(() => {
    if(token) {
      return true;
    }
    return false;
  });
  const removeToken = () => {
    localStorage.setItem('token', JSON.stringify(null));
  }
  const handleLogout = () => {
    removeToken();
    setIsLogged(false);
  }
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
  <div className='App'>
  {isLogged===false && <Login setToken={setToken} setIsLogged={setIsLogged} />}
    {isLogged===true && <div className="wrapper">
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
  </div>}
  </div>
  );
}

export default App;
