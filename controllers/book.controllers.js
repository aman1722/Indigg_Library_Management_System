const { BookModel } = require("../models/book.model");






const addBook = async (req, res) => {
    try {
        const { ISBN, title, author, published_year, quantity } = req.body;

        if (!ISBN || !title || !author || !published_year || !quantity) return res.status(400).send({ ok: false, msg: "All Fields are Require!" })

        const isBookAlreadyPresent = await BookModel.findOne({ ISBN });

        if (isBookAlreadyPresent) {
            isBookAlreadyPresent.quantity += 1;

            await isBookAlreadyPresent.save();

            return res.status(200).send({ ok: true, msg: "Book Already Exixts! Updated the book Quantity!" })
        }

        const newBook = new BookModel({ ...req.body });

        await newBook.save();

        res.status(201).send({ ok: true, msg: "New Book Added!" })
    } catch (error) {
        console.log('/book/add: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }

}


const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const payload = req.body;


        await BookModel.findByIdAndUpdate({ _id: bookId }, payload);
        res.status(200).send({ ok: true, msg: "Book Details Updated" });

    } catch (error) {
        console.log('/book/update: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        await BookModel.findByIdAndDelete({ _id: bookId });
        res.status(200).send({ ok:true,msg: "Book Deleted" });


    } catch (error) {
        console.log('/book/delete: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


const getAllBook = async (req, res) => {
    try {
        const books = await BookModel.find({});

        res.status(200).send({ok:true,books})

    } catch (error) {
        console.log('/book/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}



module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBook
}