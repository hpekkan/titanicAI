import "../App.css";
var randomEmail = require("random-email");

function Login({ event, updateEvent }) {
  function handleEmailChange(e) {
    updateEvent({ email: e.target.value });
  }

  function handlePasswordChange(e) {
    updateEvent({ password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: handle login logic here
  }
  const generatePassword = () => {
    // Create a random password
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    // Set the generated password as state
    return randomPassword;
  };
  function handleRandomLogin(e) {
    e.preventDefault();
    updateEvent({ email: randomEmail({ domain: "gmail.com" }) });
    updateEvent({
      password: generatePassword(),
    });
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
