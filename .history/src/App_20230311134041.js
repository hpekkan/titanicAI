import './App.css';
import {useReducer} from 'react';
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
