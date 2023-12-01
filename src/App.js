import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotesTag from "./components/NotesTag";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useContext } from "react";
import NoteContext from "./context/notes/NoteContext";
import Contact from "./components/Contact";

function App() {
  const context = useContext(NoteContext);
  return (
    <>
      <Router>
        <NoteState>
          <Navbar />
          <Alert alert={useContext.alert} />
          <div className="container">
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/notes" element={<NotesTag />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
