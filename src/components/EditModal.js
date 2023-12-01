import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";

function EditModal(props) {
  const context = useContext(NoteContext);

  // refernce to close modal
  const refClose = useRef(null);

  // state for note edited
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // set note to note selected wonly when note sent as prop changes
  useEffect(() => {
    setNote({
      id: props.note._id,
      etitle: props.note.title,
      edescription: props.note.description,
      etag: props.note.tag,
    });
  }, [props.note]);

  // handle on change when input changes
  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // handle form when submitted
  const handleEditNote = (e) => {
    refClose.current.click();
    context.editNote(note.id, note.etitle, note.edescription, note.etag);
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
                Edit Note
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
                    Enter Title for you note
                  </label>
                  <input
                    onChange={onChange}
                    value={note.etitle}
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
                    Enter Description for your note
                  </label>
                  <input
                    onChange={onChange}
                    value={note.edescription}
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
                    Enter tag for your note
                  </label>
                  <input
                    onChange={onChange}
                    value={note.etag}
                    name="etag"
                    type="text"
                    className="form-control"
                    id="etag"
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
                disabled={note.etitle.length <= 7 || note.edescription.length <= 7}
                onClick={handleEditNote}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
