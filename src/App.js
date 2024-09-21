import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ServicesTag from "./components/ServicesTag";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceState from "./context/services/ServiceState";
import Alert from "./components/Alert";
import { useContext } from "react";
// import ServiceContext from "./context/services/ServiceContext";
import Contact from "./components/Contact";

import MyServices from "./components/MyServices";

function App() {
  // const context = useContext(NoteContext);
  return (
    <>
      <Router>
        <ServiceState>
          <Navbar />
          <Alert alert={useContext.alert} />
          <div className="container">
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<ServicesTag />} />
              <Route path="/services/:id" element={<MyServices />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </ServiceState>
      </Router>
    </>
  );
}

export default App;
