const books=[
    {
    ISBN:"1234Book",
    title:"Getting Started with C++",
    pubdate:"12-07-2023",
    author:[1,2],
    numpage:259,
    language:"en",
    category:["edutech","programmming"],
    publish:[1],
    },
    {
        ISBN:"12345Book",
        title:"Getting Started with C++",
        pubdate:"12-07-2023",
        author:[2],
        numpage:209,
        language:"en",
        category:["edutech","programmming"],
        publish:[2],
    }

];


const author=[{
    id:1,
    name:"Jahnavi",
    books:["1234Book"],
},
{
    id:2,
    name:"Hemanth",
    books:["12345Book"],
}
];


const publication=[
    {
        id:1,
        name:"AtoZ",
        books:["1234Book"],
    },
    {
        id:2,
        name:"editinfinte",
        books:["1234vook"],
    }



];

module.exports={books,author,publication};