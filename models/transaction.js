const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema(

  {
    name : {type: String,required: true},
    type : {type: String},
    amount : {type : Number},
    date :  {type : String}

  }

);

let Transaction = mongoose.model('Transcation',transactionSchema);

module.exports = Transaction ;
