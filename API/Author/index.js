const Router=require("express").Router();

const authorModel=require("../../database/author");
const BookModel=require("../../database/book");

/*
Route   /author
Description  Get all the authors in the database
parameter   NONe
methods    get
Access     Public
*/
Router.get("/",async (req,res)=>{
    const getmode=await authorModel.find();
    return res.json({data:getmode});
});

/*
Route   /author/book
Description  Get all the authors with specified book isbn in the database
parameter   isbn
methods    get
Access     Public
*/
Router.get("/book/:isbn",async (req,res)=>{
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

Router.post("/add",async (req,res)=>{
    const { newauthor }=req.body;
    const a=await authorModel.create(newauthor);
    database.author.push(newauthor);
    return res.json(a);
});


//put 
//update or add new author
Router.put("/book/update/author/:isbn",async (req,res)=>{
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
/*Route   /book/delete/author/:isbn
Description  deleting the author in book and update author api
parameter   ISBN
methods    delete
Access     Public
*/

Router.delete("/book/delete/author/:isbn/:id",async (req,res)=>{
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
module.exports=Router;