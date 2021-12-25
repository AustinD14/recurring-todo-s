import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Router>
        {/* Navbar */}
        <Routes>
          <Route path='sign-in' element= {<SignIn/>}/>
          <Route path='sign-up' element= {<SignUp/>}/>
          <Route path='forgot-password' element= {<ForgotPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
