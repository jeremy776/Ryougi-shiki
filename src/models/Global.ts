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

export default mongoose.model("Global", GlobalChat);
