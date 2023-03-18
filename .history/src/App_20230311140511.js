import './App.css';
import {useReducer} from 'react';
import Login from './components/Login';
function App() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      email: "",
      password: "",
      loginSuccess: false,
      showPassword: "password",
    }
  );
  return (
    <div className="App">
      <header className="App-header">
        {event.loginSuccess=== false &&<Login event={event} updateEvent={updateEvent} />}
      </header>
    </div>
  );
}

export default App;
