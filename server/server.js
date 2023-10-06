const express =require("express");
const cors=require("cors");
// import "./leadEnvironment.mjs";
const mongoose=require("mongoose");
const genroutes=require("./routes/record");
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
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