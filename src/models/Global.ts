const mongoose = require("mongoose");

mongoose.connect(client.config.mongoURL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
})
mongoose.connection.on("connected", (ngebuk) => {  
  console.log("DATABASE TELAH DI KONEK BAPAK/IBU")
  if(ngebuk) console.log(ngebuk)
})

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
