import React, { useEffect } from 'react'
import AddForm from './AddForm'
import Notes from './Notes'

function NotesTag() {
  useEffect(() => {
    document.title = 'NoteKeeper | Notes'
  })
  return (
    <div>
      <AddForm/>
      <hr className="border border-primary border-3 opacity-75"/>
      <Notes/>
    </div>
  )
}

export default NotesTag
