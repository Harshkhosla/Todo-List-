import React, { useState } from 'react'
import noteContext  from "../context/notes/noteContext";
import { useContext } from 'react';
const AddNote = () => {
    const context =useContext(noteContext);
    const{ addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: ""})

    }

     const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
     }
  return (
    <div>
      <div className="container my-3">
      <h1>Add a note</h1> ``
      <form>
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="title"  name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">description</label>
    <input type="text" class="form-control" id="description"name="description" value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="tag" class="form-label">Tag</label>
    <input type="text" class="form-control" id="tag"name="tag"value ={note.tag} onChange={onChange}/>
  </div>
  <button disabled={note.title.length<4} type="submit" class="btn btn-primary "  onClick={handleClick}>Add Note</button>
</form>
</div>
    </div>
  )
}

export default AddNote
