import React, { useContext } from "react";
import deleteIcon from "./icons/delete.png";
import editIcon from "./icons/edit.png";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const handleDeleteNote = (id) => {
    context.deleteNote(id);
    context.showAlert("success", "Successfully Deleted a Note");
  };
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
          {props.note.tag}
          <span className="visually-hidden">unread messages</span>
        </span>
        <div className="card-body">
          <h5 className="card-title">{props.note.title} </h5>
          <p className="card-text">{props.note.description}</p>
          <img
            onClick={() => {
              handleDeleteNote(props.note._id);
            }}
            className="mx-2"
            src={deleteIcon}
            alt="delete"
          />
          <img
            onClick={() => {
              props.updateNote(props.note);
            }}
            className="mx-2"
            src={editIcon}
            alt="edit"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
