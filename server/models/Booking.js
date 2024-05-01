const mongoose=require("mongoose");

const bookingSchema= new mongoose.Schema({
    ListingID:{
        type:String,
        required:true
    },
    GuestID:{
        type:String,
        required:true
    },
    HostID:{
        type:String,
        required:true
    },
    FromDate:{
        type:Date,
        required:true
    },
    ToDate:{
        type:Date,
        required:true
    },
    NumGuests:{
        type:Number,
        default:2
    },
    // Verified:{
    //     type:Boolean,
    //     default:false
    // },
    Status:{
        type:String,
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Booking',bookingSchema);