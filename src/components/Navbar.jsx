import { useNavigate, useLocation } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => { // TODO ADD FILL 
    if (route == location.pathname) return true;
  };

  return (
    <footer>
      <nav className="navbar"></nav>
      <ul className="navbarListItems">
        <li className="navbarListItem" onClick={() => navigate("/")}>
          <p>Landing Page</p>
        </li>
        <li className="navbarListItem" onClick={() => navigate("/sign-in")}>
          <p>sign in</p>
        </li>
        <li className="navbarListItem" onClick={() => navigate("/sign-up")}>
          <p>sign up</p>
        </li>
      </ul>
    </footer>
  );
}

export default Navbar;
