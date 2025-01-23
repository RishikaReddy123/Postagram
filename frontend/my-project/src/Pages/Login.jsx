import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import M from "materialize-css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      M.toast({ html: "Invalid email!" });
      return;
    }

    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
          M.toast({ html: "Login successful!" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h3>Postagram</h3>
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
        <button onClick={login} className="waves-effect waves-light btn">
          Login
        </button>
        <Link to="/signup">
          <h6>Don't have an account yet?</h6>
        </Link>
      </div>
    </div>
  );
};

export default Login;
