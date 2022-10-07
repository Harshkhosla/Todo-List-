var jwt = require('jsonwebtoken');
const JWT_SECRET='harshisa$gv';

const  fetchuser=(req,res,next)=>{
    const token= req.header("auth-token");  
    if(!token){
        res.status(401).send({error:"please type something valid"})
    }
    try {
        const data =jwt.verify(token,JWT_SECRET)
    req.user=data;
    next();
        
    } catch (error) {
        res.status(401).send({error:"please type something valid"})       
        
    }
}
    


module.exports =fetchuser; 