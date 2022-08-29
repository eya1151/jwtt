const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv/config");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello");
});


//impoet router
const userRoute =require("./routes/auth");
const postRoute=require("./routes/posts");
app.use("/api/users/",userRoute);
app.use("/api/posts/",postRoute);

mongoose.connect(
    process.env.DB_CONNECTION,()=>{
    
    console.log("connected"); 
}
  );



 app.listen(6000, () => console.log('Server started: 6000'));