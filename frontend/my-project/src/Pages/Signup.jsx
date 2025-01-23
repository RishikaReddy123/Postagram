import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!fullName || !email || !password) {
      M.toast({ html: "Please fill in all fields!" });
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      M.toast({ html: "Invalid email format!" });
      return;
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message) {
          M.toast({ html: data.message });
          if (data.message === "Registration successful") {
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        M.toast({ html: "Something went wrong. Please try again." });
      });
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h3>Postagram</h3>
        <input
          placeholder="Full Name"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          onClick={() => register()}
          className="waves-effect waves-light btn"
        >
          Sign Up
        </button>
        <Link to="/login">
          <h6>Already have an account?</h6>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
