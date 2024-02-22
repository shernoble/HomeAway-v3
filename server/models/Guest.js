const mongoose=require("mongoose");

const guestSchema= new mongoose.Schema({
    UserType:{
        type:String,
        default:'Guest',
        immutable:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    Bookings:{
        type:[Object],
        required:false
    },
    Reviews:{
        type:[String],
        required:false
    },
    Bookmarks:{
        type:[String]
    },
    Verified:{
        type:Boolean,
        default:false
    }
});

guestSchema.index({UserName:'text',Email:'text'});

module.exports=mongoose.model('Guest',guestSchema);