const router=require("express").Router();
const verify=require("../routes/verifyUser")
router.get("/",verify,(req,res)=>{
    res.json({
        post:{
            title:"my1post",
            descriotion:"aaaa",
        },
    });
});
module.exports=router;