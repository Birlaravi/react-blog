const router = require("express").Router();
const Category = require("../models/Category");

//post
router.post("/",async(req,res)=>{
    const newcat=new Category(req.body);
    try{
        const savedcat=await newcat.save();
        res.status(200).json(savedcat);
    }catch(error){
        res.status(500).json(error);
    }
});
//get
router.get("/",async(req,res)=>{
  
    try{
        const cats=await Category.find();
        res.status(200).json(cats);
    }catch(error){
        res.status(500).json(error);
    }
});
module.exports = router;