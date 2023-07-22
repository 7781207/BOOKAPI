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
console.log("few");

 
book.get("/",async (req,res)=>{
    const getmodel=await BookModel.find();
    console.log(getmodel);
    return res.json(getmodel);
});
/*
Route   /is
Description  Get the specified isbn books in the database
parameter   isbn
methods    get
Access     Public
*/
book.get("/is/:isbn",async (req,res)=>{
    const getbook=await BookModel.findOne({ISBN:req.params.isbn});
    if(!getbook){
        res.json({"error":`No book with the given ISBN ${req.params.isbn} is fount`});
    }
    /*const getbook=database.books.filter((stu)=>stu.ISBN === req.params.isbn);
    //if(getbook.length===0){
        return res.json({"error":`No book with the given ISBN ${req.params.isbn} is fount`});
    }*/
    return res.json(getbook);
});
/*
Route   /c
Description  Get all the books with specified cateory in the database
parameter   category
methods    get
Access     Public
*/
book.get("/c/:cat",async (req,res)=>{
    const getbook=await BookModel.findOne({category:req.params.cat});
    if(!getbook){
        return res.json({"error":"No data found"});
    }
    /*
    const categor=req.params.cat;
    const getcat=database.books.filter((cv)=>cv.category.includes(categor));
    if(getcat.length===0){
        return res.json({data:"NO FOUND"});

    }*/
    return res.json(getbook);
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
book.get("/author/book/:isbn",async (req,res)=>{
    const categor=req.params.isbn;
    const getcategory=await authorModel.findOne({books:req.params.isbn});
    const getcat=database.author.filter((cv)=>cv.books.includes(categor));
    if(!getcategory){
        return res.json({data:"NO FOUND"});
    }
    /*if(getcat.length===0){
        return res.json({data:"NO FOUND"});

    }*/
    return res.json(getcategory);
});
/*
Route   /pubbs
Description  Get all the publications in the database
parameter   -
methods    get
Access     Public
*/
book.get("/pubbs",async (req,res)=>{
    const abc=await pubModel.find();
    //return res.json({publications:database.publication});
    return res.json(abc);
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

//post
//Add a book
book.post("/bookd/add",async (req,res)=>{

    const {newbook}=req.body;
    const addbook=await BookModel.create(newbook);
    database.books.push(newbook);
    return res.json(addbook);
});

//add new author
book.post("/authors/add",async (req,res)=>{
    const { newauthor }=req.body;
    const a=await authorModel.create(newauthor);
    database.author.push(newauthor);
    return res.json(a);
});


book.post("/pubbi/add",(req,res)=>{
    const {newpub}=req.body;
    database.publication.push(newpub);
    return res.json({author:database.publication});
});

//PUT

book.put("/book/update/title/:isbn",async (req,res)=>{
    const abc=await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            title:req.body.newtitle
        },{
            new:true
        }
    );
    /*database.books.forEach((bk)=>{
      if(bk.ISBN === req.params.isbn) {
        bk.title = req.body.newbooktitle;
        console.log("its running");
        return;
        }
    });*/

    return res.json({books:abc});

});
//put 
//update or add new author
book.put("/book/update/author/:isbn",async (req,res)=>{
    const updatedbook=await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            $addToSet:{
                author:req.body.newauthor
            }
        },{
            new:true
        }
    );
    const authy=await authorModel.findOneAndUpdate(
        {
            id:req.body.newauthor
        },{
            $addToSet:{
                books:req.params.isbn
            }
        },{
            new:true
        }
    );
    /*database.books.forEach((ivb)=>{
        if(ivb.ISBN===req.params.isbn){
            return ivb.author.push(parseInt(req.body.newauthorid));
        }
    });
    database.author.forEach((abc)=>{
        if(abc.id === parseInt(req.body.newauthorid)){
            return abc.books.push(req.params.isbn);
        }
    });*/
    return res.json({books:updatedbook,authors:authy});
});

/*
Route   /publication/updata/book
Description  updating the publications and the pushing id of publication into book api
parameter   ISBN
methods    updata
Access     Public
*/

book.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication datatype
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubbid){
            return pub.books.push(req.params.isbn);
            
        }

    });
    database.books.forEach((hpo)=>{
        if(hpo.ISBN===req.params.isbn){
            hpo.publish.push(req.body.pubbid);
            return;
        }
    });
    return res.json({data:database.books,pudh:database.publication});
});

/*
Route   /book/delete/:isbn
Description  updating the publications and the pushing id of publication into book api
parameter   ISBN
methods    delete
Access     Public
*/
book.delete("/book/delete/:isbn",async (req,res)=>{
    const app=await BookModel.findOneAndDelete(
        {
            ISBN:req.params.isbn
        }
    );
    /*const app=database.books.filter(
        (bk)=>bk.ISBN !== req.params.isbn
    );
    database.books=app;*/
    return res.json({books:app});
});

/*
Route   /book/delete/author/:isbn
Description  deleting the author in book and update author api
parameter   ISBN
methods    delete
Access     Public
*/

book.delete("/book/delete/author/:isbn/:id",async (req,res)=>{
    const abc=await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            $pull:{
                author:parseInt(req.params.id)
            }
        },
        {
            new:true
        }
    );
    const bcs=await authorModel.findOneAndDelete(
        {
            id:parseInt(req.params.id)
        },{
            $pull:{
                books:req.params.isbn
            }
        },{
            new:true
        }
    );
    /*database.books.forEach((bk)=>{
        if(bk.ISBN===req.params.isbn){
            const ath=bk.author.filter((jo)=>jo!==parseInt(req.params.id));
            bk.author=ath;
            return;
        }
    
    });

    database.author.forEach((jh)=>{
        if(jh.id===parseInt(req.params.id)){
            const ik=jh.books.filter((oo)=>oo!==req.params.isbn);
            jh.books=ik;
            return ;
        }
    });*/
    return res.json({books:abc,author:bcs});
});
/*
Route   /book/delete/author/:isbn
Description  deleting the author in book and update author api
parameter   ISBN
methods    delete
Access     Public
*/
book.delete("/publication/delete/:isbn/:pubid",(req,res)=>{
    database.publication.forEach((oo)=>{
        if(oo.id===parseInt(req.params.pubid)){
            const jk=oo.books.filter((pk)=>pk!==req.params.isbn);
            oo.books=jk;
            return;
        }


    });

    database.books.forEach((ip)=>{
        if(ip.ISBN===req.params.isbn){
            ip.publish=0;
            return;
        }
    });
    return res.json({books:database.books,ph:database.publication});
})

book.listen(3000,()=>console.log("Hello AP"));
