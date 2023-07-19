const mongoose=require("mongoose");

const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    pubdate:String,
    author:[Number],
    numpage:Number,
    language:String,
    category:[String],
    publish:[Number],
});

const BookModel=mongoose.model("book",BookSchema);

module.exports=BookModel;