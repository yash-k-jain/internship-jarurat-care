import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceContext from "../context/services/ServiceContext";

import ServiceItem from "./ServiceItem";
import EditModal from "./EditModal";

const MyServices = () => {
  const context = useContext(ServiceContext);
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(null);

  const ref = useRef(null);

  const updateService = async (currentService) => {
    ref.current.click();
    setSelectedService(currentService);
  };

  useEffect(() => {
    context.getUserService(id);
  }, [id, context.services]);

  console.log(context.userServices);
  return (
    <div>
      <div>
        <EditModal service={selectedService} refOpen={ref} />
      </div>
      <h1 className="my-2"> Your Services</h1>
      <hr className="border border-primary border-3 opacity-75" />

      <div className="row">
        {context.userServices?.map((service) => (
          <ServiceItem
            key={service?._id}
            service={service}
            MyServices={true}
            updateService={updateService}
          />
        ))}
      </div>
    </div>
  );
};

export default MyServices;
