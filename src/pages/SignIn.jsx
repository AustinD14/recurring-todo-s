import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/Profile");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="pagecontainer">
      <header>
        <p className="pageHeader"> Welcome Back</p>
      </header>
      <form onSubmit={onSubmit}>
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
