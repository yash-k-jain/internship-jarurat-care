import React, { useContext, useState } from "react";
import ServiceContext from "../context/services/ServiceContext";

function AddForm() {
  const context = useContext(ServiceContext);

  // state for note added
  const [service, setService] = useState({
    title: "",
    description: "",
    price: 0,
  });

  // function when input changes
  const onChange = (e) => {
    e.preventDefault();
    setService({ ...service, [e.target.name]: e.target.value });
  };

  // handle form when submitted
  const handleAddService = (e) => {
    e.preventDefault();
    context.addService(service.title, service.description, service.price);
    context.userDetails();
    setService({ title: "", description: "", price: "" });
    context.showAlert('success', 'Note Added Succssfully')
  };
  
  return (
    <div>
      <h1 className="my-2"> Add A Service </h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter Title for your Service
          </label>
          <input
            onChange={onChange}
            value={service.title}
            name="title"
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Enter Description for your Service
          </label>
          <input
            onChange={onChange}
            value={service.description}
            name="description"
            type="text"
            className="form-control"
            id="description"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Enter Price for your Service
          </label>
          <input
            onChange={onChange}
            value={service.price}
            name="price"
            type="number"
            className="form-control"
            id="price"
          />
        </div>
        <button
          onClick={handleAddService}
          type="submit"
          className="btn btn-primary"
          disabled={service.title.length <= 7 || service.description.length <= 7}
        >
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddForm;
