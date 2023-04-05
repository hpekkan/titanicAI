export default function authHeader() {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const access_token = tokens.access_token;
  if (access_token) {
    return { Authorization: "Bearer " + access_token };
  } else {
    return {};
  }
}
