import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.title = "NoteKeeper | Login";
  }, []);
  const context = useContext(NoteContext);

  const navigate = useNavigate();

  // state for ceredentials
  const [ceredentials, setCeredentials] = useState({ email: "", password: "" });
  const [inputType, setInputType] = useState("password");
  const [showButton, setShowButton] = useState("Show");

  // handle on change when input changes
  const onChange = (e) => {
    e.preventDefault();
    setCeredentials({ ...ceredentials, [e.target.name]: e.target.value });
  };

  // handle form when form submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    await context.login(ceredentials.email, ceredentials.password);
    setCeredentials({ email: "", password: "" });
  };

  const handlePasswordType = () => {
    if(inputType === 'password'){
      setInputType('text')
    }else{
      setInputType('password')
    }
    if(showButton === 'Show'){
      setShowButton('Hide')
    }else{
      setShowButton('Show')
    }
  };

  return (
    <div className="container my-3">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={ceredentials.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={ceredentials.password}
            type={inputType}
            className="form-control"
            id="password"
            name="password"
          />
          <a
            onClick={handlePasswordType}
            className="btn btn-outline-success my-2"
          >
            {showButton}
          </a>
        </div>
        <button
          onClick={handleSubmit}
          disabled={ceredentials.password.length < 8}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
