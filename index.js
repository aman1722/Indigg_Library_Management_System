const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");


const app = express();

app.use(express.json());
app.use(cors());


app.get("/",async(req,res)=>{
    try {
        res.status(200).send({ok:true,message:"Welcome to INDI.GG Backend Assignment!"})
    } catch (error) {
        res.status(501).send({ok:false,error:error.message})
    }
})






app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB sucessfully!")
    } catch (error) {
        console.log("Unable to connect DB!")
        console.log(error.message)
    }
    console.log(`Server is runing on PORT ${process.env.PORT}!`)
})