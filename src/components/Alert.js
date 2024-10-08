import React, { useContext } from "react";
import ServiceContext from "../context/services/ServiceContext";

function Alert() {
  const context = useContext(ServiceContext)
  const capitalize = (word) => {
    word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div>
      {context.alert.msg && <div className={`alert alert-${context.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(context.alert.type)}</strong>:  {context.alert.msg}
      </div>}
    </div>
  );
}

export default Alert;
