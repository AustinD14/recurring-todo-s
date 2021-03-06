import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import List from "./pages/List";
import ForgotPassword from "./pages/ForgotPassword";
import CreateTasks from "./pages/CreateTasks";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/list" element={<PrivateRoute />}>
            <Route path="/list" element={<List />} />
          </Route>

          <Route path="/create-tasks" element={<PrivateRoute />}>
            <Route path="/create-tasks" element={<CreateTasks />} />
          </Route>
          <Route path="/edit-task/:taskId" element={<EditTask />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
