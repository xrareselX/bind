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
import Nav from './components/Nav';
import './index.css';


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
      <div className="App">
        <Nav/>
        {/* <div className='container mt-5 pt-5'> */}
          {/* <div className="auth-wrapper">
            <div className="auth-inner"> */}
              <Routes>
                <Route exact path="/" element={isLoggedIn=="true" ? <UserDetails/>  :<Login />} />
                {!isLoggedIn && <Route path="/sign-in" element={<Login />} />}
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/reset" element={<Reset />} />
                {/* <Route path="/edit-user/:id" element={<EditUser />} /> */}
                <Route path="/edit-user/:id" element={isLoggedIn=="true" ? <EditUser/>  :<Login />} />
                {/* <Route path="/edit-dns/:id" element={<EditDns />} /> */}
                <Route path="/edit-dns/:id" element={isLoggedIn=="true" ? <EditDns/>  :<Login/>} />
              </Routes>
            {/* </div>
          </div> */}
        {/* </div> */}
      </div>
  );
}

export default App;
