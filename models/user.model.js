// importing all module-------->
const mongoose = require("mongoose");
require("dotenv").config();


//Schema for user -------->
const userSchema = mongoose.Schema({
     name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role:{
        type:String,
        enum:["user","admin"],
        default:"user"
      },
      borrowedBooks:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book' // Reference to the Book model
        }
      ]
})

// model for user------>
const UserModel = mongoose.model("user",userSchema);


//export module---->
module.exports={
    UserModel
}