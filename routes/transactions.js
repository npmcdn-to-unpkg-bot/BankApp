var express = require('express');
var router = express.Router();

let Transaction = require('../models/Transaction');


router.get('/', function(req, res) {
  Transaction.find({},(err,transactions)=>{
    if(err) {
      res.status(400).send(err);
    }else{
      res.send(transactions);
    }
  }).populate('toppings');
});

router.get('/:id',(req,res)=>{
  Transaction.findById(req.params.id,(err,transaction)=>{
    if(err || !transaction){
      res.status(400).send(err || 'Transaction not found !');
    }else{
      res.send(transaction);
    }
  });
});

router.delete('/:id',(req,res)=>{
  Transaction.findByIdAndRemove(req.params.id,(err,transaction)=>{
    if(err || !transaction){
      res.status(400).send(err || 'Transaction not found !');
    }else{
      res.send(transaction.name+' deleted');
    }
  });
});

router.post('/',(req,res)=>{
  Transaction.create(req.body,(err,transaction)=>{
    if(err || !transaction){
      res.status(400).send(err || 'Transaction not found !');
    }else{
      res.send(transaction);
    }
  });
});
//router.put('/:id',(req,res)=>{
router.put('/',(req,res)=>{
  //Transaction.findByIdAndUpdate(req.params.id,req.body,{new : true},(err,transaction)=>{
  Transaction.findByIdAndUpdate(req.body._id,req.body,{new : true},(err,transaction)=>{
    if(err || !transaction){
      res.status(400).send(err || 'Transaction not found !');
    }else{
      res.send(transaction);
    }
  });
});




module.exports = router;
