const express = require(express); 
const app = express(); 

// Middleware 
 app.use(express.json())

 const books = [
    {
        id: "1", 
        title: "Book 1"
    },
    {
        id: "2", 
        title: "Book 2"
    },
 ]

 // intro route; 
 app.get("/", (req, res)=> {
    res.json({
        message: 'Welcome to bookstore api'
    })
 })