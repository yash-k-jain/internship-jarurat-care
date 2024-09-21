import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ServiceContext from "../context/services/ServiceContext";

export default function Navbar() {
  let location = useLocation();

  const context = useContext(ServiceContext);

  const navigate = useNavigate();

  useEffect(() => {
    context.userDetails();
    // console.log(context.user)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    context.setServices([]);
    context.setUser({});
    context.showAlert("success", "Successfully Logged Out");
  };

  useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ServiceKeeper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/services" ? "active" : ""
                  }`}
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/services/:id" ? "active" : ""
                  }`}
                  onClick={(e) => !context.user && e.preventDefault()}
                  to={`/services/${context.user?._id}`}
                >
                  My Services
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-outline-success"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <form className="d-flex" role="search">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-success mx-2"
                >
                  LogOut
                </button>
                <button disabled className="btn btn-outline-success">
                  {context.user?.name.charAt(0).toUpperCase() +
                    context.user?.name.slice(1)}
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
