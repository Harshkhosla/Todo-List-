import React, { useEffect ,useRef ,useState } from 'react'
import noteContext  from "../context/notes/noteContext";
import { useContext } from 'react';
import Nodeitem from './Nodeitem';
import AddNote from './AddNote';

const Notes = () => {
    const context =useContext(noteContext);
    const{notess,getNotes,editNotes}=context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

    useEffect(()=>{
      getNotes()
    },[])
    const ref =useRef(null)
    const refClose =useRef(null)
    const updateNote=(currentNote)=>{
      ref.current.click()
      setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description,etag: currentNote.tag} )

    }
    const handleClick=(e)=>{
      console.log("upadting the note...")
      editNotes(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click()
      

  }

   const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
   }
    
  return (
    <>
    <AddNote/>

    
    <button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label for="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle"  name="etitle"aria-describedby="emailHelp"value={note.etitle}onChange={onChange}minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="edescription" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription"name="edescription"value={note.edescription}onChange={onChange}minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag"name="etag"value={note.etag}onChange={onChange}/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button ref ={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div>
      <div className="row my-3">
      <h1>Add your notes</h1>
      {notess.length===0 &&'no notes to display'}
      {notess.map((note)=>{
        return <Nodeitem key ={note._id} updateNote={updateNote} note ={note}/>;

})}
      </div>
    </div>
    </>
  )
}

export default Notes
