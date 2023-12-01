import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

export default function Navbar() {
  let location = useLocation();

  const context = useContext(NoteContext);

  const navigate = useNavigate();

  // useEffect( () => {
  //   context.userDetails()
  //   // console.log(context.user)
  // }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    context.setNotes([])
    context.setUser({})
    context.showAlert("success", "Successfully Logged Out");
  };

  useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NoteKeeper
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
                    location.pathname === "/notes" ? "active" : ""
                  }`}
                  to="/notes"
                >
                  Notes
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
                {/* {!context.user.name === '' && <button disabled
                  className="btn btn-outline-success"
                > 
                {context.user.name}
                </button>} */}
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
