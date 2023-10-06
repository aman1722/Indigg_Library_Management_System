const express = require("express");
const { getAllBook, searchBook } = require("../controllers/book.controllers");


const bookRouter = express.Router();





bookRouter.get("/",getAllBook)

bookRouter.get("/search",searchBook);

module.exports={
    bookRouter
}