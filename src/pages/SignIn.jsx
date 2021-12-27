import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };
  return (
    <div className="pagecontainer">
      <header>
        <p className="pageHeader"> Welcome Back</p>
      </header>
      <form>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />

        <div className="passwordInput">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <button
            alt="show password"
            className="showpassword"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {" "}
            show password
          </button>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
        </div>

        <button className="signInButton">SIGN IN</button>
        <Link to="/sign-up" className="registerLink">
          Sign Up
        </Link>
      </form>

      {/* GGOOGLE OAUTH */}
    </div>
  );
}

export default SignIn;
