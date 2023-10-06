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
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 4; 

        const skip = (page - 1) * limit; 

        const totalBooks = await BookModel.countDocuments(); 

        
        const books = await BookModel.find({})
            .skip(skip)
            .limit(limit);

        res.status(200).send({
            ok: true,
            books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit)
        });

    } catch (error) {
        console.log('/book/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}



const searchBook = async(req,res)=>{
    const {searchTerm} = req.query; 

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required.' });
  }

  try {
    const searchTermString = String(searchTerm);
    const matchingBooks = await BookModel.find({
        $or: [
          { title: { $regex: searchTermString, $options: 'i' } },
          { author: { $regex: searchTermString, $options: 'i' } },
          { ISBN: { $regex: searchTermString, $options: 'i' } }, 
        ],
      });

    res.status(200).json(matchingBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
}



module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBook,
    searchBook
}