import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddForm() {
  const context = useContext(NoteContext);

  // state for note added
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  // function when input changes
  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // handle form when submitted
  const handleAddNote = (e) => {
    e.preventDefault();
    context.addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    context.showAlert('success', 'Note Added Succssfully')
  };
  
  return (
    <div>
      <h1 className="my-2"> Add A Note </h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter Title for you note
          </label>
          <input
            onChange={onChange}
            value={note.title}
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
            Enter Description for your note
          </label>
          <input
            onChange={onChange}
            value={note.description}
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
            Enter tag for your note
          </label>
          <input
            onChange={onChange}
            value={note.tag}
            name="tag"
            type="text"
            className="form-control"
            id="tag"
          />
        </div>
        <button
          onClick={handleAddNote}
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length <= 7 || note.description.length <= 7}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddForm;
