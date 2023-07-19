const mongoose=require("mongoose");

const pubSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

const pubModel=mongoose.model(pubSchema);
module.exports=pubModel;