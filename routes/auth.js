

const router= require('express').Router();
const User = require ("../model/User");
const bcrypt = require("bcryptjs");
const {registerValidation , loginValidation}=require ("../validation ")
const JWT =require("jsonwebtoken");
router.get('/',(req,res)=>{
    res.send("aaaaa");
});

router.post('/register', async(req,res)=>{

// validate the user 
const{error}= registerValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

// checking user email
const emailExiste= await User.findOne({email:req.body.email});
if (emailExiste) return res.status(400).send("Email exists");


const salt =await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(req.body.password,salt); 

   const newRecord = new User({
       LastName: req.body.LastName, 
        email: req.body.email,
       password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      })
    
    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new data : ' + err);
       })  
    res.status(400).send({status:'Failed',msg:err})
   }  
);

// login
router.post("/login",async(req,res)=>{
    // validate user data
    const{error}= loginValidation(req.data);
    if (error) return res.status(400).send(error.details[0].message);
//checking email
const user= await User.findOne({email:req.body.email});
if (!user) return res.status(400).send("invalid email");
// checking password
const validpass=await bcrypt.compare(req.body);
if (!validpass) return res.status(200).send("password invalid");


//create token for user
const token =JWT.sign({_id:user._id},process.env.TOKEN_SECRET)
res.header("auth-token",token).send(token);





});



module.exports=router; 