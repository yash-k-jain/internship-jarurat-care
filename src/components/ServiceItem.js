import React, { useContext, useEffect } from "react";
import deleteIcon from "./icons/delete.png";
import editIcon from "./icons/edit.png";
import ServiceContext from "../context/services/ServiceContext";

const ServiceItem = (props) => {
  const context = useContext(ServiceContext);
  const handleDeleteService = (id) => {
    context.deleteService(id);
    context.showAlert("success", "Successfully Deleted a Service");
  };

  return (
    <div className="col-md-6 my-2">
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          ₹{` ${props.service.price}`}
          <span className="visually-hidden">unread messages</span>
        </span>
        <div className="card-body">
          <h5 className="card-title">{props.service.title} </h5>
          <p className="card-text">{props.service.description}</p>
          {props.MyServices && (
            <>
              <img
                onClick={() => {
                  handleDeleteService(props.service._id);
                }}
                src={deleteIcon}
                alt="delete"
              />
              <img
                onClick={() => {
                  props.updateService(props.service);
                }}
                className="mx-2"
                src={editIcon}
                alt="edit"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
