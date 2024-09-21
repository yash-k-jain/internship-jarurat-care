import React, { useState, useContext, useEffect, useRef } from "react";
import ServiceContext from "../context/services/ServiceContext";

function EditModal(props) {
  const context = useContext(ServiceContext);

  // refernce to close modal
  const refClose = useRef(null);

  // state for note edited
  const [service, setService] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eprice: "",
  });

  // set note to note selected wonly when note sent as prop changes
  useEffect(() => {
    setService({
      id: props.service?._id,
      etitle: props.service?.title,
      edescription: props.service?.description,
      eprice: props.service?.price,
    });
  }, [props.service]);

  // handle on change when input changes
  const onChange = (e) => {
    e.preventDefault();
    setService({ ...service, [e.target.name]: e.target.value });
  };

  // handle form when submitted
  const handleEditService = (e) => {
    refClose.current.click();
    context.editService(service.id, service.etitle, service.edescription, service.eprice);
    context.showAlert('success', 'Successfully Updated a Note')
  };
  
  return (
    <div>
      <button
        ref={props.refOpen}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Service
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Enter Title for you Service
                  </label>
                  <input
                    onChange={onChange}
                    value={service.etitle}
                    name="etitle"
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Enter Description for your Service
                  </label>
                  <input
                    onChange={onChange}
                    value={service.edescription}
                    name="edescription"
                    type="text"
                    className="form-control"
                    id="edescription"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Enter Price for your Service
                  </label>
                  <input
                    onChange={onChange}
                    value={service.eprice}
                    name="eprice"
                    type="number"
                    className="form-control"
                    id="eprice"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={service.etitle?.length <= 7 || service.edescription?.length <= 7}
                onClick={handleEditService}
                type="button"
                className="btn btn-primary"
              >
                Update Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
