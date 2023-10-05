const express = require("express");
require("dotenv").config();
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");


const app = express();

app.use(express.json());
app.use(cors());


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "INDI.GG Library Management System",
            version: "1.0.0",
            description:
                "",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./docs/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/",async(req,res)=>{
    try {
        res.status(200).send({ok:true,message:"Welcome to INDI.GG Backend Assignment!"})
    } catch (error) {
        res.status(501).send({ok:false,error:error.message})
    }
})


app.use("/user",userRouter);





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


