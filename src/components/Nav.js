import { Link } from "react-router-dom";

function Nav(props) {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const logout = () => {
      window.localStorage.clear();
      window.location.href = "/sign-in";
    }
    return(
        <nav className="navbar navbar-expand-lg  mb-5">
          <div className="container-fluid ms-5">
            <Link className="navbar-brand ms-5" to={isLoggedIn ? '/userDetails' :'/sign-in'}>
              Bind
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link> 
                </li> */}
                <li className="nav-item">
                  {isLoggedIn == "true" && <Link className="nav-link" to={'/userDetails'}>Dashboard</Link> }
                </li>
              </ul>
            </div>
            <div class="d-flex">
              <ul class="navbar-nav">
                <li class="nav-item">
                {isLoggedIn == "true" ? <Link onClick={logout} className="nav-link" to={'/sign-in'}>
                    Sign out
                  </Link> : <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>}
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
    );
}
export default Nav;