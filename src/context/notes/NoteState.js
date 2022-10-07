import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notess, setNotes] = useState(notesInitial)
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTZlYWMxNWZmMWQ1YTYzMmRkYjViNiIsImlhdCI6MTY1NDA1NzY4Mn0.K4RRRGkmKaNRcipRgjU6JImK8oNfFat9bxSAwu7tHSc'

      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addallnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTZlYWMxNWZmMWQ1YTYzMmRkYjViNiIsImlhdCI6MTY1NDA1NzY4Mn0.K4RRRGkmKaNRcipRgjU6JImK8oNfFat9bxSAwu7tHSc'

      },

      body: JSON.stringify({ title, description, tag })
    });
    const note =await response.json(); 
    
   
    setNotes(notess.concat(note))

  }
  const deleteNotes = async(id) => {
    const response = await fetch(`${host}/api/notes/deleteanote/${id}`, {
      method: 'Delete',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTZlYWMxNWZmMWQ1YTYzMmRkYjViNiIsImlhdCI6MTY1NDA1NzY4Mn0.K4RRRGkmKaNRcipRgjU6JImK8oNfFat9bxSAwu7tHSc'

      },

      
    });
    const json = response.json();
    console.log(json)
    console.log("deleting id" + id)
    const newNotes = notess.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  const editNotes = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateanote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTZlYWMxNWZmMWQ1YTYzMmRkYjViNiIsImlhdCI6MTY1NDA1NzY4Mn0.K4RRRGkmKaNRcipRgjU6JImK8oNfFat9bxSAwu7tHSc'

      },

      body: JSON.stringify({ id,title, description, tag })
    });
    const json = response.json();
    console.log(json)
    let newNotes =JSON.parse(JSON.stringify(notess))
    console.log(newNotes.length)
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notess, addNote, deleteNotes, editNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;