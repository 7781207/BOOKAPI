const Router=require("express").Router();

const BookModel=require("../../database/book");

/*Route   /
Description  Get all the books in the database
parameter   0
methods    get
Access     Public
*/
 
Router.get("/",async (req,res)=>{
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
Router.get("/is/:isbn",async (req,res)=>{
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

/*Route   /c
Description  Get all the books with specified cateory in the database
parameter   category
methods    get
Access     Public
*/
Router.get("/c/:cat",async (req,res)=>{
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

//post
//Add a book
Router.post("/bookd/add",async (req,res)=>{

    const {newbook}=req.body;
    const addbook=await BookModel.create(newbook);
    database.books.push(newbook);
    return res.json(addbook);
});

//PUT

Router.put("/update/title/:isbn",async (req,res)=>{
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

/*
Route   /book/delete/:isbn
Description  updating the publications and the pushing id of publication into book api
parameter   ISBN
methods    delete
Access     Public
*/
Router.delete("/delete/:isbn",async (req,res)=>{
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

module.exports=Router;