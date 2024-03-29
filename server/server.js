const express =require("express");
const cors=require("cors");
const morgan=require("morgan");
const path=require("path");
const rfs=require("rotating-file-stream");
// import "./leadEnvironment.mjs";
// const mongoose=require("mongoose");
const genroutes=require("./routes/record");
const adminroutes=require("./routes/adminRoutes");
const guestroutes=require("./routes/guestRoutes");
require('dotenv').config();

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5050;
const app = express();


// app.use(morgan('dev'));

var accessLogStream = rfs.createStream("test.log", {
    interval: '15m', // Rotate hourly
    path: path.join(__dirname, 'log')
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());
// app.use(express.json()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin",adminroutes);
app.use("/guest",guestroutes);
app.use("/",genroutes);


// const uri=process.env.MONGODB_URI;
// mongoose.connect(uri);   
// const connection=mongoose.connection;
// connection.once('open', () => {
//     console.log("mongodb connection est successfully!");
// })

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});