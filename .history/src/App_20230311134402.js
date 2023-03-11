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
    }
  );
  return (
    <div className="App">
      <header className="App-header">
        {event.loginSuccess=== false &&<Login event={event}  />}
      </header>
    </div>
  );
}

export default App;
