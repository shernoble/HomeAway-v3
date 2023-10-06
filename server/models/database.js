const mongoose=require("mongoose");
require('dotenv').config({ path: '.env' });

const uri=process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(uri,{ useNewUrlParser: true });
const connection=mongoose.connection;
connection.once('open', () => {
    console.log("mongodb connection est successfully!");
})

require('./Admin');
require('./Guest');
require('./Host');
require('./Listing');
require('./Booking');

module.exports=connection;