import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(NoteContext);
  const navigate = useNavigate()

  useEffect(() => {
    context.getNotes();
    // eslint-disable-next-line
    if(!localStorage.getItem('token')){
      navigate("/login")
    }
  }, []);

  // refernce to open modal
  const ref = useRef(null);

  // state for note given bt noteitem
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // set note when clicked on edit icon
  const updateNote = async (currentNote) => {
    ref.current.click()
    setNote(currentNote);
  };
  
  return (
    <>
      <div>
        <EditModal note={note} refOpen={ref} />
      </div>
      <div className="row my-2">
        <h1 className="my-2">Your Notes</h1>
        <div className="row mx-5">
          {context.notes.length === 0
            ? "No Notes To Display"
            : context.notes.map((note) => {
                return (
                  <NoteItem
                    updateNote={updateNote}
                    key={note._id}
                    note={note}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default Notes;
