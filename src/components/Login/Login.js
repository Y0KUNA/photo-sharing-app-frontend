import { useState } from "react";
import { useNavigate } from "react-router-dom";
async function fetchUser(username) {
  try {
    const res = await fetch(
      `https://383889-8080.csb.app/api/user/getUser/${username}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch user info", error);
  }
}

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://383889-8080.csb.app/api/user/admin/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(creds),
        }
      );

      if (response.ok) {
        const user = await fetchUser(String(creds.username));
        console.log(
          "username: ",
          user.username,
          " last name: ",
          user.last_name
        );
        onLogin && onLogin(user);
        navigate(`/users/${user._id}`);
      } else setError("Invalid username or password!");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };
  return (
    <div style={{ padding: 10 }}>
      {" "}
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </div>
  );
}
