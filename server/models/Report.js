// const mongoose=require("mongoose");

// const reportSchema= new mongoose.Schema({
//     // take the report id as the actual object id
//     guestID:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     subject:{
//         type:String
//     },
//     description:{
//         type:String,
//         required:true
//     }
// });

// reportSchema.index({category:"text",subject:"text",description:"text"});

// module.exports=mongoose.model('Report',reportSchema);
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    guestID: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

reportSchema.index({ category: "text", subject: "text", description: "text" });

module.exports = mongoose.model('Report', reportSchema);
