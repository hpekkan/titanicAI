import React, { useState } from 'react';

import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleEmailChange(event) {
      setEmail(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      // TODO: handle login logic here
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Log In</button>
      </form>
    );
  }
  
  export default Login;