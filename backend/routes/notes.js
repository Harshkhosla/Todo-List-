const express = require('express');
const Notes = require('../models/Notes');
const router =express.Router();
var fetchuser =require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');





router.get('/getallnotes',fetchuser,async (req,res)=>{
    try {
        
    
    const notes =await Notes.find({user:req.user.id});
    
    res.json(notes)
} catch (error){
    console.error(error.message);
    res.status(500).send("Mongo db server is down man");
  } 

})


router.post('/addallnotes',fetchuser,[
    
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Enter a valid disctiption').isLength({ min: 3 }),
    
],async (req,res)=>{


    try {
        
    
    const {title ,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const notes = new Notes({
        title ,description ,tag ,user:req.user.id
    })
    const saveNotes =await notes.save()
    
    
    res.json(saveNotes)
} catch(error){
    console.error(error.message);
    res.status(500).send("Mongo db server is down man");
  } 

})




router.put('/updateanote/:id',fetchuser,async (req,res)=>{
    try {
        
    
    const{title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let notes=await Notes.findById(req.params.id)
    if(!notes){return res.state(404),send("not found")}

    if(notes.user.toString()!==req.user.id){
        return res.status(401).send("not alloweddw")
    }
    notes= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{$new:true})
    res.json({notes});
}catch(error){
        console.error(error.message);
        res.status(500).send("Mongo db server is down man");
      }




})




router.delete('/deleteanote/:id',fetchuser,async (req,res)=>{
    try {
        
    
    
    
    let notes=await Notes.findById(req.params.id)
    if(!notes){return res.state(404),send("not found")}

    if(notes.user.toString()!==req.user.id){
        return res.status(401).send("not alloweddw")
    }
    notes= await Notes.findByIdAndDelete(req.params.id)
    res.json({"sucess" : "note has been deleted",notes:notes});

}catch(error){
    console.error(error.message);
    res.status(500).send("Mongo db server is down man");
  }





})

module.exports = router