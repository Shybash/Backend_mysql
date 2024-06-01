const db=require('../db');
const express=require('express');
const router=express.Router();

router.get('/countCat',(req,res)=>{

    const query='SELECT COUNT(*) AS count FROM categories';

    db.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        return res.json({count:result[0].count});
    })
})

module.exports=router;