const mongoose = require("mongoose");



const bookSchema = mongoose.Schema({
    ISBN:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    published_year:{
        type: Number, 
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }
});

const BookModel = mongoose.model("book",bookSchema);


module.exports={
    BookModel
}
