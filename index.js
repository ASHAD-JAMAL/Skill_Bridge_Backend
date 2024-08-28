require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./configs/db");


const mainRoutes = require("./routes/mainRoutes");

const {MONGO_URL,PORT} = process.env;

const app = express();

//Connection to the database
dbConnection(MONGO_URL);

//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin:'*',  //update origin to match found URL
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);

//Routes
app.use("/",mainRoutes);


const port = PORT || 5000;

app.listen(port,() => {
    console.log(`The app is running on http://localhost:${port}`);
});