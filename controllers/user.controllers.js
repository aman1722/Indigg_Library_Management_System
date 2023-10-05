// importing all module-------->
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const { validationResult } = require("express-validator");
const { BookModel } = require("../models/book.model");
const { BookLogModel } = require("../models/bookLog.model");
const  mongoose  = require("mongoose");





// user registration ------>
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const isUserAlreadyExists = await UserModel.findOne({ email });

        if (isUserAlreadyExists) return res.status(400).send({ msg: "User Already Exists" });

        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const newUser = await new UserModel({ ...req.body, password: hashPassword });
        await newUser.save();

        res.status(201).send({ ok: true, msg: "User Registration Successful" })
    } catch (error) {
        console.log('/user/register: ', err.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

// user login -------->
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await UserModel.findOne({ email });;

        if (!userExists) return res.status(400).send({ msg: "User not exixts! Plaese register first" });

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

        if (!isPasswordCorrect) return res.status(400).send({ msg: "Incorrect Password!" });;

        const token = jwt.sign(
            { userId: userExists._id, role: userExists.role },
            process.env.JWT_LOGIN_SECRET,
            {
                expiresIn: "3h",
            }
        );

        res.status(200).json({ ok: true, msg: "Login Successful", token });
    } catch (error) {
        console.log('/user/login: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// user logout------->
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
        const blacklisted = new BlacklistModel({ "token": token });
        await blacklisted.save();
        console.log('logout successful')
        res.status(200).send({ ok: true, msg: 'Logout Successful' });
    } catch (error) {
        console.log('/user/logout: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


const borrowBook = async (req, res) => {
    try {
        const { userId } = req.body;
        const bookId = req.params.bookId;
        const user = await UserModel.findById(userId);
        const book = await BookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ msg: 'Book not found.' });
        }

        if (user.borrowedBooks.length >= 3) {
            return res.status(400).json({ msg: 'You have reached the maximum limit of borrowed books (3 books).' });
        }

        if (book.quantity === 0) {
            return res.status(400).json({ error: 'The book is not available for borrowing.' });
        }
        const bookLog = new BookLogModel({
            user: userId,
            book: bookId,
            action: 'borrow',
        });

        await bookLog.save();


        user.borrowedBooks.push(book);
        book.quantity -= 1;

        await user.save();
        await book.save();

        res.status(200).json({ ok: true, msg: 'Book borrowed successfully.' });
    } catch (error) {
        console.log('/user/borrow: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

const returnBook = async (req, res) => {
    try {
        const { userId } = req.body;
        const bookId = req.params.bookId;
        const user = await UserModel.findById(userId);
        const book = await BookModel.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or book not found.' });
        }

        
        const borrowedIndex = user.borrowedBooks.indexOf(bookId);
        if (borrowedIndex === -1) {
            return res.status(400).json({ error: 'You have not borrowed this book.' });
        }
       
        const returnLog = new BookLogModel({
            user: userId,
            book: bookId,
            action: 'return',
        });

        await returnLog.save();
        
        user.borrowedBooks.splice(borrowedIndex, 1);
        book.quantity += 1;

       
        await user.save();
        await book.save();

        res.status(200).json({ msg: 'Book returned successfully.' });
    } catch (error) {
        console.log('/user/return: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

const getBookHistory = async (req, res) => {
    

    try {
        const { userId } = req.body;
        const bookId = req.params.bookId;

  
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        
        const book = await BookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        

        const bookHistory = await BookLogModel.aggregate([
            {
              $match: {
                user: new mongoose.Types.ObjectId(userId),
                book: new mongoose.Types.ObjectId(bookId),
                action: { $in: ['borrow', 'return'] },
              },
            },
            {
              $sort: { timestamp: -1 }, 
            },
          ]);
          if(bookHistory.length===0) return res.status(200).send({ok:true,msg:"You Never Borrowed this book!"})
          res.status(200).json(bookHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
// export module------->
module.exports = {
    register,
    login,
    logout,
    borrowBook,
    returnBook,
    getBookHistory
}