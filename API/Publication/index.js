const Router=require("express").Router();

const pubModel=require("../../database/pubii");



/*
Route   /pubbs
Description  Get all the publications in the database
parameter   -
methods    get
Access     Public
*/
Router.get("/",async (req,res)=>{
    const abc=await pubModel.find();
    //return res.json({publications:database.publication});
    return res.json({data:abc});
});

/*
Route   /pubbs
Description  Get all the publications with specified id in the database
parameter   id
methods    get
Access     Public
*/

Router.get("/pubbs/:id",(req,res)=>{
    const ids=parseInt(req.params.id);
    const getbook=database.publication.filter((stu)=>stu.id===ids);
    if(getbook.length===0){
        return res.json({"error":`No publications with the given id ${req.params.id} is fount`});
    }
    return res.json({publications:getbook});
});

//post
//Add a book


//add new author


Router.post("/pubbi/add",(req,res)=>{
    const {newpub}=req.body;
    database.publication.push(newpub);
    return res.json({author:database.publication});
});

//PUT



/*
Route   /publication/updata/book
Description  updating the publications and the pushing id of publication into book api
parameter   ISBN
methods    updata
Access     Public
*/

Router.put("/publication/update/book/:isbn",(req,res)=>{
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

/*
Route   /book/delete/author/:isbn
Description  deleting the author in book and update author api
parameter   ISBN
methods    delete
Access     Public
*/
Router.delete("/publication/delete/:isbn/:pubid",(req,res)=>{
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

module.exports=Router;