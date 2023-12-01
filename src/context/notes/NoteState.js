import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [user, setUser] = useState({name: ""});

  // host of the server
  const host = "http://localhost:5000";

  const navigate = useNavigate();

  // state for notes
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/allNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // login a user
  const login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    if (json.authToken) {
      // save token and redirect to home
      localStorage.setItem("token", json.authToken);
      navigate("/notes");
      showAlert("success", "Successfully Logged In");
    } else {
      showAlert("danger", "Invalid Credentials");
    }
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const json = await response.json();
    if (json.authToken) {
      // save token and redirect to home
      localStorage.setItem("token", json.authToken);
      navigate("/notes");
      showAlert("success", "Successfully Logged In");
    } else {
      showAlert("danger", "Invalid Ceredentials");
    }
  };

  // const userDetails = async () => {
  //   if (localStorage.getItem("token")) {
  //     const response = await fetch(`${host}/api/auth/userDetails`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json)
  //   }
  // };

  const contact = async (name, email, subject, message) => {
    const response = await fetch(`${host}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, email: email, subject: subject, message: message }), 
    });
    const json = await response.json();

  }

  const showAlert = (type, message) => {
    setAlert({ type: type, msg: message });
    setTimeout(() => {
      setAlert({ type: "", msg: "" });
    }, 1500);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        addNote,
        deleteNote,
        editNote,
        login,
        register,
        alert,
        showAlert,
        user, 
        // userDetails,
        setUser,
        contact
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
