import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <header>
        <p>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="email"
            className="emailInput"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>
          <div className="ResetLink">
            <button className="Reset Button">Send Reset Link</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
