const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser =require('../middleware/fetchuser')


const router =express.Router();
const JWT_SECRET='harshisa$gv'

router.post('/createuser',[
    body('name','Enter a valid thing').isLength({ min: 3 }),
    body('email','Enter a valid thing').isEmail(),
    body('password','Enter a valid thing').isLength({ min: 3 })
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user =User.fundOne({email:res.body.email
    });
    if(user){
      returnres.status(400).json({error:"sory"})
    }
    const salt = await bcrypt.genSaltSync(10);
    secPass =await bcrypt.hash(req.body.password,salt);
     user =await  User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data ={
        id: user.id
      }
      const authtoken =jwt.sign(data,JWT_SECRET)
      res.json({authtoken});
    
      //  .then(user => res.json(user));  
      } catch(error){
        console.error(error.message);
        res.status(500).send("some error ocured");
      }    
})
router.post('/login',[

  body('email','Enter a valid thing').isEmail(),
  body('password','password cannot be blank').exists(),
],async(req,res)=>{
  let sucess=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body;
    try {
      let user =await User.findOne({email});
      if(!user){
        sucess=false
        return res.status(400).json({error:"invalid login "});
      }
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        sucess=false;
        return res.status(400).json({sucess ,error:"invalid login "});
      }
      const data ={
        user:{
        id: user.id
        }
      }
      const authtoken =jwt.sign(data,JWT_SECRET);
      sucess=true;
      res.json({sucess,authtoken});

    } catch(error){
      console.error(error.message);
      res.status(500).send("some error ocured");
    }



});
router.post('/getuser',fetchuser,async(req,res)=>{
try {

  userId=req.user.id;
  const user =await User.findById(userId).select("-password")
   res.send(user)
}catch(error){
  console.error(error.message);
  res.status(500).send("some error ocured");
}
});
// res.send(req.body);   
module.exports = router