import React from 'react'
import { useContext } from 'react';
import noteContext  from "../context/notes/noteContext";

const Nodeitem = (props) => {
    const context =useContext(noteContext);
    const { deleteNotes } = context;
    const { note,updateNote } = props;
    return (

        <div className="col-md-3">
            <div class="card ">

                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                    <i class="fa-solid fa-trash mx-3"onClick={()=>{deleteNotes(note._id)}}></i>
                    <i class="fa-solid fa-pen"onClick={()=>{updateNote(note)}}></i>
                    

                </div>
            </div>
            
        </div>


    )
}

export default Nodeitem
