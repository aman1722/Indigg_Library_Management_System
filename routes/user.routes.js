// importing all module-------->
const express = require("express");
const { body } = require("express-validator");
const { register, login, logout, borrowBook, returnBook, getBookHistory } = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

// creating a user router instance----->
const userRouter = express.Router();



userRouter.post("/register", [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be atleast 3 characters"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
], register);





userRouter.post("/login",[
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
], login);




userRouter.post("/logout",authMiddleware, logout);

userRouter.post("/borrow/:bookId",authMiddleware,borrowBook);

userRouter.post("/return/:bookId",authMiddleware,returnBook);

userRouter.get("/book/:bookId/history",authMiddleware,getBookHistory);



// module export---->
module.exports = {
    userRouter
}