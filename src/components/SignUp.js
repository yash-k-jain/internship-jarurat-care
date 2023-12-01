import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  useEffect(() => {
    document.title = "NoteKeeper | Registration"
  }, [])
  const context = useContext(NoteContext)

  const navigate = useNavigate();

  // state for ceredentials
  const [ceredentials, setCeredentials] = useState({name: "",  email: "", password: "" });

  // handle on change when input changes
  const onChange = (e) => {
    e.preventDefault();
    setCeredentials({ ...ceredentials, [e.target.name]: e.target.value });
  };

  // handle form when form submitted 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await context.register(ceredentials.name, ceredentials.email, ceredentials.password)
    setCeredentials({name: "", email: "", password: ""})
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            onChange={onChange}
            value={ceredentials.name}
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
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
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button disabled={ceredentials.password.length < 8} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp
