const express = require("express");
const { addBook, updateBook, deleteBook, getAllBook, searchBook } = require("../controllers/book.controllers");
const { authorizeMiddleware } = require("../middlewares/authorize.middleware");


const bookRouter = express.Router();



bookRouter.post("/add",authorizeMiddleware("admin"),addBook);

bookRouter.patch("/update/:bookId",authorizeMiddleware("admin"),updateBook)

bookRouter.delete("/delete/:bookId",authorizeMiddleware("admin"),deleteBook)

bookRouter.get("/",getAllBook)

bookRouter.get("/search",searchBook);

module.exports={
    bookRouter
}