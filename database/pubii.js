const mongoose=require("mongoose");

const pubSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

const pubModel=mongoose.model("pubbi",pubSchema);
module.exports=pubModel;