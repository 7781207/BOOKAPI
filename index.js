const express=require("express");

const book=express();
book.use(express.json());
const database=require("./database");
/*
Route   /
Description  Get all the books in the database
parameter   0
methods    get
Access     Public
*/



book.get("/",(req,res)=>{
    return res.json({books:database.books});
});
/*
Route   /is
Description  Get the specified isbn books in the database
parameter   isbn
methods    get
Access     Public
*/
book.get("/is/:isbn",(req,res)=>{
    const getbook=database.books.filter((stu)=>stu.ISBN===req.params.isbn);
    if(getbook.length===0){
        return res.json({"error":`No book with the given ISBN ${req.params.isbn} is fount`});
    }
    return res.json({books:getbook});
});
/*
Route   /c
Description  Get all the books with specified cateory in the database
parameter   category
methods    get
Access     Public
*/
book.get("/c/:cat",(req,res)=>{
    const categor=req.params.cat;
    const getcat=database.books.filter((cv)=>cv.category.includes(categor));
    if(getcat.length===0){
        return res.json({data:"NO FOUND"});

    }
    return res.json({books:getcat});
});
/*
Route   /author
Description  Get all the authors in the database
parameter   NONe
methods    get
Access     Public
*/
book.get("/author",(req,res)=>{
    return res.json({data:database.author});
});
/*
Route   /author/book
Description  Get all the authors with specified book isbn in the database
parameter   isbn
methods    get
Access     Public
*/
book.get("/author/book/:isbn",(req,res)=>{
    const categor=req.params.isbn;
    const getcat=database.author.filter((cv)=>cv.books.includes(categor));
    if(getcat.length===0){
        return res.json({data:"NO FOUND"});

    }
    return res.json({authors:getcat});
});
/*
Route   /pubbs
Description  Get all the publications in the database
parameter   -
methods    get
Access     Public
*/
book.get("/pubbs",(req,res)=>{
    return res.json({publications:database.publication});
});

/*
Route   /pubbs
Description  Get all the publications with specified id in the database
parameter   id
methods    get
Access     Public
*/

book.get("/pubbs/:id",(req,res)=>{
    const ids=parseInt(req.params.id);
    const getbook=database.publication.filter((stu)=>stu.id===ids);
    if(getbook.length===0){
        return res.json({"error":`No publications with the given id ${req.params.id} is fount`});
    }
    return res.json({publications:getbook});
});



book.listen(3000,()=>console.log("Hello AP"));
