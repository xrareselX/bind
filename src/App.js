import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Login from './components/login.component';
import SignUp from './components/signup.component';
// import { BrowserRouter as  Link, Route, Router, Routes } from 'react-router-dom';
import { Routes, Route, Outlet, Link, Router } from "react-router-dom";
import UserDetails from './components/userDetails';
import Reset from './components/reset';
import EditUser from './components/editUser';
import EditDns from './components/editDns';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/sign-in";
  }
  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={isLoggedIn ? '/userDetails' :'/sign-in'}>
              Bind
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {isLoggedIn == "true" ? <Link onClick={logout} className="nav-link" to={'/sign-in'}>
                    Sign out
                  </Link> : <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link> 
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <div className='container mt-5 pt-5'> */}

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn=="true" ? <UserDetails/>  :<Login />} />
              {!isLoggedIn && <Route path="/sign-in" element={<Login />} />}
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/edit-dns/:id" element={<EditDns />} />
            </Routes>
          </div>
        </div>
        {/* </div> */}
      </div>
  );
}

export default App;
