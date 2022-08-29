const mongoose=require('mongoose');
const user=mongoose.model(
    "pepollsdb",
    {
    name:{
        type: String,
        required:true,   
        min:6,
         max:225,
         },
    email:{
         type: String,
        required:true,   
         min:6,
          max:225,
             },
    password:{
            type: String,
            required:true,   
             min:6,
             max:225,
                 },
     data:{
             type: String,
               default: Date.now,
     },           
});
"pepolls"
module.exports = { user };