const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GlobalChat = new Schema({
   id:{
     type:Number,
     required:true
   },
   guild:{
     type:Number,
     required:true
    }
});

module.export = mongoose.model("Global", GlobalChat);
