import React, { useState } from "react";
import NoteContext from "./ServiceContext";
import { useNavigate } from "react-router-dom";

const ServiceState = (props) => {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // state for Services
  const servicesInitial = [];
  const [services, setServices] = useState(servicesInitial);
  const [userServices, setUserServices] = useState([]);

  // Get all Services
  const getServices = async () => {
    const response = await fetch(`/api/services/allServices`, {
      method: "GET",
    });
    const json = await response.json();
    setServices(json);
  };

  // Get a Service
  const getUserService = async (id) => {
    const response = await fetch(`/api/services/getService/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    console.log(json);
    setUserServices(json);
  };

  // Add Service
  const addService = async (title, description, price) => {
    try {
      const response = await fetch(`/api/services/addService`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, price }),
      });
      const service = await response.json();

      if (!response.ok) {
        setAlert({
          type: "danger",
          msg: service.error || "Failed to add service",
        });

        return;
      }
      setServices(services.concat(service));
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    const response = await fetch(`/api/services/deleteService/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newService = services.filter((service) => {
      return service._id !== id;
    });
    setServices(newService);
  };

  // Edit Service
  const editService = async (id, title, description, price) => {
    const response = await fetch(`/api/services/updateService/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, price }),
    });
    const newServices = JSON.parse(JSON.stringify(services));
    for (let i = 0; i < newServices.length; i++) {
      if (newServices[i]._id === id) {
        newServices[i].title = title;
        newServices[i].description = description;
        newServices[i].price = price;
        break;
      }
    }
    setServices(newServices);
  };

  // login a user
  const login = async (email, password) => {
    const response = await fetch(`/api/auth/login`, {
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
      userDetails();
      navigate("/services");
      showAlert("success", "Successfully Logged In");
    } else {
      showAlert("danger", "Invalid Credentials");
    }
  };

  const register = async (name, email, password) => {
    const response = await fetch(`/api/auth/register`, {
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
      userDetails();
      navigate("/services");
      showAlert("success", "Successfully Logged In");
    } else {
      showAlert("danger", "Invalid Ceredentials");
    }
  };

  const userDetails = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch(`/api/auth/userDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setUser(json);
    }
  };

  const contact = async (name, email, subject, message) => {
    const response = await fetch(`/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    });
    const json = await response.json();
  };

  const showAlert = (type, message) => {
    setAlert({ type: type, msg: message });
    setTimeout(() => {
      setAlert({ type: "", msg: "" });
    }, 1500);
  };

  return (
    <NoteContext.Provider
      value={{
        services,
        userServices,
        setServices,
        getServices,
        getUserService,
        addService,
        deleteService,
        editService,
        login,
        register,
        alert,
        showAlert,
        user,
        userDetails,
        setUser,
        contact,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default ServiceState;
