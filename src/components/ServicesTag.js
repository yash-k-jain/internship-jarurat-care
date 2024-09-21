import React, { useContext, useEffect } from "react";
import AddForm from "./AddForm";
import Services from "./Services";
import ServiceContext from "../context/services/ServiceContext";

function ServicesTag() {
  const context = useContext(ServiceContext);
  useEffect(() => {
    document.title = "ServiceKeeper | Services";
  });

  useEffect(() => {
    context.getServices();
    // eslint-disable-next-line
  }, [context.services]);
  return (
    <div>
      <AddForm />
      <hr className="border border-primary border-3 opacity-75" />
      <Services />
    </div>
  );
}

export default ServicesTag;
