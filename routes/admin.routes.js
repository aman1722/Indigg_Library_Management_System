const express = require("express");
const { addBook, updateBook, deleteBook } = require("../controllers/book.controllers");
const { authorizeMiddleware } = require("../middlewares/authorize.middleware");


const adminRouter = express.Router();


adminRouter.post("/add",authorizeMiddleware("admin"),addBook);

adminRouter.patch("/update/:bookId",authorizeMiddleware("admin"),updateBook)

adminRouter.delete("/delete/:bookId",authorizeMiddleware("admin"),deleteBook)





module.exports={
    adminRouter
}