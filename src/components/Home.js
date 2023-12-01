import { useEffect } from "react";
import AddForm from "./AddForm";
import Notes from "./Notes";

function Home() {
  useEffect(() => {
    document.title = "NoteKeeper | HomePage";
  });
  return (
    <div className="container my-2">
      <div className="container bg-warning" style={{ color: "white" }}>
        <h1 style={{ padding: "3rem" }}>
          NoteKeeper - <br></br>
          <span style={{ color: "red", padding: "4rem" }}>
            A website which keeps your notes
          </span>
        </h1>
      </div>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Features</h2>
        <hr className="border border-primary border-3 opacity-75"/>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">User Authentication</h3>
            <p>
            User registration and login functionality to keep notes private.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Note Editing</h3>
            <p>
            Intuitive note creation and editing interface.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Security</h3>
            <p>
            End-to-end encryption for data security.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Scalability</h3>
            <p>
            Design the system to handle a growing number of users and notes efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
