import React, { useContext, useEffect, useRef, useState } from "react";
import ServiceContext from "../context/services/ServiceContext";
import ServiceItem from "./ServiceItem";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(ServiceContext);
  const navigate = useNavigate();

  // refernce to open modal
  const ref = useRef(null);

  // state for note given bt noteitem
  const [service, setService] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    context.userDetails();
  }, []);

  return (
    <>
      <div>
        <EditModal service={service} refOpen={ref} />
      </div>
      <div className="row my-2">
        <h1 className="my-2">Services</h1>
        <div className="row">
          {context.services.length === 0
            ? "No Services To Display"
            : context.services.map((service) => {
                return (
                  <ServiceItem
                    key={service._id}
                    service={service}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default Notes;
