
import "../App.css";
var randomEmail = require("random-email");
var generator = require('generate-password');

function Login({event, updateEvent}) {

  function handleEmailChange(e) {
    updateEvent({email : e.target.value});
  }

  function handlePasswordChange(e) {
    updateEvent({password : e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: handle login logic here
  }

  function handleRandomLogin(e) {
    e.preventDefault();
    updateEvent({email : randomEmail({domain: "gmail.com"})});
    updateEvent({password : generator.generate({length: 10, numbers: true})});
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={event.email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={event.password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit">Log In</button>
      <label>
        <button type="submit" onClick={handleRandomLogin}>
          Random Login
        </button>
      </label>
    </form>
  );
}

export default Login;
