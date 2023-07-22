require("dotenv").config();
//Express
const express=require("express");

//Mongoose
const mongoose=require('mongoose');

//calling express object creating
const book=express();
book.use(express.json());
//database
let database=require("./database");
//models
//book
const BookModel=require("./database/book");

//author model
const authorModel=require("./database/author");

//pubbi model



const pubModel = require("./database/pubii");
//Microservice
const boks=require("./API/Book");
const auth=require("./API/Author");
const pub=require("./API/Publication");
//mongooose connection
mongoose.connect(
    process.env.MONGO_URL
).then(()=>console.log("abc"));

/* 
{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true,
        
    },(err)=>{
        if(err){
            console.log("error");
        }else{
            console.log("No Error");
        }
    }
,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}
mangoo
Route   /
Description  Get all the books in the database
parameter   0
methods    get
Access     Public
*/
book.use("/bk",boks);

book.use("/auth",auth);

book.use("/pubbi",pub);


/*
Route   /author
Description  Get all the authors in the database
parameter   NONe
methods    get
Access     Public
*/




book.listen(3000,()=>console.log("Hello AP"));
