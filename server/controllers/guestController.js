require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;


const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');
const Report=require('../models/Report');
const Admin = require('../models/Admin');


// const Redis=require('redis');

// const redisClient=Redis.createClient();

// indexes


// works
exports.guestStartingPage=async(req,res) => {
    try{
        res.render("guest-startingPage");
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}
// works
exports.guestStartingPagePost=async(req,res) => {
    // redirect
    let place=req.body.formvalues.location;
    let num_guests=req.body.formvalues.guests;
    console.log(place+" "+num_guests);
    // res.json("wehere");
    res.redirect("/guest/homepage/?location="+place+"&guests="+num_guests);
}

exports.guestHomePageFull=async(req,res) => {
    // directy going without filter
    // display page with all listings
    // handle filters for whole db 
    // no filter upon filter
    try{
        let property_type=req.query.property;
        console.log("property:"+property_type);
        if(property_type !== undefined && property_type!=="All"){
            Listing.find({ PropertyType: property_type })
            .then(function(results){
            })
            .catch(function(error){
                return res.status(500).send({message:error.message || "Error Occured"});
            
            })
        }
        if(property_type ==undefined || property_type=="All"){
            Listing.find()
            .then(function(results){
                res.json(results);
            })
            .catch(function(error){
                // console.log(error);
                return res.status(500).send({message:error.message || "Error Occured"});
            })
        }
    }
    catch(error){
        // console.log("error:"+err);
        return res.status(500).send({message:error.message || "Error Occured"});
    }

}

// exports.guestProfile=async(req,res) => {
//     try{
//         // get bookings also

//         session=req.session;
//         if(session.userid){
//             // find user and send details
//             Guest.findOne({'Email':session.userid})
//                 .then(function(results){
//                     console.log(results);
//                     Booking.find({'GuestID':session.userid})
//                         .then(function(docs){
                        
//                             res.render("guest-profile",{profile:results,bookings:docs,userLoggedIn:true});

//                         })
//                         .catch(function(err){
//                             res.render("error");
//                             console.log(err);
//                         })
//                 })
//                 .catch(function(error){
//                     res.render("error");
//                     console.log(error);
//                 })
            
//         }
//         else{
//             res.render("guest-login");
//         }
//     }
//     catch(error){
//         res.render("error");
//         console.log(error);
//     }
// }

exports.guestGetBooking=async(req,res) => {
    try{
        const id=req.params.id;
        // console.log(booking);
        // const id=booking.ListingID;
        Listing.findById(id)
        .then(function(result){
            if(result){
                return res.status(200).send({success:true, listing:result });
            }
            else{
                return res.status(500).send({success:false, message: 'error is finding listing!' });
            }
        })
        .catch(function(err){
            return res.status(500).send({success:false, message: 'error is finding listing!' });
        })
    }
    catch(error){
        return res.status(500).send({success:false, message: 'error is finding listing!' });
    }
}

exports.getBookings =async(req,res) => {
    try{
        const id = req.query.user_id;
        // console.log("user id : ");
        // console.log(id);
        // res.json([]);
        Booking.find({GuestID:id})
            .then(function(results){
                res.status(200).send({bookings:results});
            })
            .catch(function(error){
                // console.log(error);
                return res.status(500).send({message:error.message || "Error Occured"});
            })
    }
    catch(error) {
        return res.status(500).send({message:error.message || "Error Occured"});
    }
}

exports.guestCancelBooking = async (req, res) => {
    try {
        // Get the booking ID from request body
        const booking_id = req.body.id;
        const user=req.body.user;
        console.log("im here in cancellation");
        // Find booking by ID and update status to "cancelled"
        const updatedBooking = await Booking.findByIdAndUpdate(
            booking_id,
            { Status: 'cancelled' },
            { new: true } // To return the updated document
        );

        const updatedUser = await Guest.findOneAndUpdate(
            { _id: user._id, "bookings._id": booking_id }, // Match the user and booking ID
            { $set: { "bookings.$.Status": 'cancelled' } }, // Update the booking status
            { new: true } // To return the updated user document
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking cancelled successfully', booking: updatedBooking,user:updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.guestEditPass=async(req,res) => {
    try{
        // get the user,new pass
        const oldpass=req.body.oldPassword;
        const newpass=req.body.newPassword;
        console.log("newpass:"+newpass);
        const userid=req.body.id;
        console.log(userid);
        Guest.findById(userid)
        .then(function(result){
            // check the 
            bcrypt.compare(oldpass,result.password,function(err,result){
                    
                if(result){
                    bcrypt.hash(newpass, saltRounds, async (err, hash) => {
                        if (err) {
                            return res.status(500).send({ success:false,message: 'Error hashing password' });
                        }
            
                        try {
                            // Find the guest user by ID and update the password
                            const updatedUser = await Guest.findByIdAndUpdate(
                                userid,
                                { password: hash },
                                { new: true } // Return the updated document
                            );
                            if (!updatedUser) {
                                return res.status(404).send({ success:false,message: 'User not found' });
                            }
                            console.log("pass updated");
                            return res.status(200).send({success:true, message: 'Password updated successfully' });
                        } catch (error) {
                            return res.status(500).send({success:false, message: 'Error updating password' });
                        }
                    });
                }
                else{
                    return res.status(200).json({ success: false,message:'incorrect password' });
                }
                
            })
        })
        .catch(function(err){
            return res.json({err:err});
        })

    }
    catch(err){
        return res.status(500).send({message:err.message || "Error Occured"});
    }
}


exports.guestHomePage=async(req,res) => {
    try{
        let place=req.query.location;
        console.log("place:"+place);
        let num_guests=req.query.guests;
        let query;
        query = {
            $and: [
                { 
                    'Address.District': place 
                },
                { 
                    MaxGuests: { 
                        $gte: num_guests 
                    } 
                }
            ]
        };
        let property_type=req.query.property;
        console.log("hgieor:"+property_type);
        if( property_type !== undefined && property_type!== 'All'){
            console.log("correct hehe");
            query.$and.push({ PropertyType: property_type });
        }
        console.log("query:"+query);
        // if( query !== undefined){
            console.log("herhoerh");
            Listing.find(query)
            
            .then(function(results){
                res.json(results);
            })
            .catch(function(error){
                return res.status(500).send({message:error.message || "Error Occured"});
            
            })
        
    }
    catch(err){
        return res.status(500).send({message:err.message || "Error Occured"});
    }
}



exports.guestLoginPost=async(req,res) => {
    try{
        // check login creds
        // const res_id=req.query.res_id;
        const email=req.body.formvalues.email;
        const pass=req.body.formvalues.password;
        console.log(req.body);
        Guest.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                bcrypt.compare(pass,results[0].password,function(err,result){
                    
                    if(result){
                        return res.status(200).json({ exists: true,auth:true,error:null,user:results[0] });
                    }
                    else{
                        return res.status(200).json({ exists: true,error:'incorrect password' });
                    }
                    
                })
            }
            else{
                return res.status(200).json({ exists: false ,error:'user doesnt exist'});
            }
        })
        .catch(function(error){
            return res.status(500).send({message:error.message || "Error Occured"});
        })
    }
    catch(err){
        return res.status(500).send({message:err.message || "Error Occured"});
    }
}



exports.guestRegisterPost=async(req,res) => {
    try{
    const username=req.body.formvalues.username;
        const email=req.body.formvalues.email;
        const phone=req.body.formvalues.phone;
        const pass=req.body.formvalues.password;
        console.log(username);
        console.log(email);


        Guest.find({'Email':email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                // alert to change
                return res.status(200).json({ exists: true,auth:false,error:'email already in use'});
            }
            else{
                // register user
                bcrypt.hash(pass,saltRounds,function(err, hash){
                    const new_user=new Guest({
                        UserName:username,
                        Email:email,
                        PhoneNumber:phone,
                        password:hash
                    })
                    Guest.create(new_user)
                    .then(function(){
                        // res.redirect("/guest/login");
                        return res.status(200).json({ exists: false ,auth:true,error:null,user:new_user});
                    })
                    .catch(function(err){
                        res.status(500).send({message:err.message || "Error Occured"});
                    })
                
                })
                

            }
        })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}


// exports.guestFilter=async(req,res) => {
//     const ch=req.body.choice;
//     const place=req.query.location;
//     const num_guests=req.query.guests;
//     if(place !== undefined && place!="all"){
//         // res.redirect("/guest/homepage/?location="+place+"&guests="+num_guests+"&property="+ch);
//     }
//     else{
//         // res.redirect("/guest/homepagefull/?property="+ch);
//     }
    
// }


exports.guestSearch=async(req,res) => {
    try{
        const item=req.body.searchterm;
        console.log("term:"+item);
        // res.render("guest-login");
        Listing.find({$text:{$search:item}})
            .then(function(results){
                if(results.length!=0)
                return res.json({success:true,results:results});
                else return res.json({success:false,message:'no results'});
            })
            .catch(function(error){
                console.log(error);
                return res.json({success:false,message:error.message || "error occured"});
            })
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:err.message || "error occured"});
    }
}

exports.guestReserve=async(req,res) => {
    try{
        const id=req.params.id;
        Listing.findOne({_id:id})
        .then(function(results){
            // console.log("len:"+results);
            // res.render("guest-reservation",{Listing:results,userLoggedIn:val});
            res.json(results);
        })
        .catch(function(err){
            res.status(500).send({message:err.message || "Error Occured"});
            // console.log(err);
            // res.render("error");

        })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
        // console.log(err);
        // res.render("error");
    }
}

exports.guestReservePost=async(req,res) => {
    try{
        const id=req.params.id;
        
            console.log("hello user");
            
            console.log("reservation"+id);
            const ci = new Date(req.body.fromDate).getTime(); // Convert string to Date and get time
            const co = new Date(req.body.toDate).getTime();
            console.log('sd:'+req.body.fromDate);
            console.log('ed:'+co);

                Listing.find({_id:id})
                    .then(function(results){
                        res.json(null);
                    })
                    .catch(function(err){
                        res.status(500).send({message:err.message || "Error Occured"});
                    });
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.guestConfirmBookingPost=async(req,res) => {
    try{
    let { listing,checkin,checkout,user }=req.body;

    listing = JSON.parse(listing);
    user=JSON.parse(user);

    console.log(listing._id);
    console.log(user._id);

    

    const date1=new Date(checkin);
    const date2=new Date(checkout);
    let flag=false;
    const listid=listing._id;
    // console.log(user);

    const new_booking=new Booking ({
        ListingID:listing._id,
        GuestID:user._id,
        HostID:listing.host.hostID,
        FromDate:date1,
        ToDate:date2,
    });
    // add booking to user bookings array (if success)
    Booking.find({ListingID:listid})
        .then((documents) => {
            // console.log(documents);
            if(documents.length!=0){
                for(let i=0;i<documents.length;i++){
                    const ti1=date1.getTime();
                    const to1=date2.getTime();
                    const ti2=documents[i].FromDate.getTime();
                    const to2=documents[i].ToDate.getTime();

                    // console.log();

                    if(!(to2<ti1 || ti2>to1 )){
                        return res.json({err:"booking dates not available.",success:false});
                    }
                
                    else if(i==documents.length-1){
                        Booking.create(new_booking)
                        .then(function(){
                            // add booking to user array
                            Guest.findByIdAndUpdate(user._id, { $push: { Bookings: new_booking } })
                                .then(() => {
                                    // DONT DELETE
                                    // find host by id
                                    // Host.findByIdAndUpdate(listing.host.hostID,{$push:{bookings:new_booking}})
                                    // .then(() => {
                                    //     return res.json({ err: null, success: true, booking: new_booking });
                                    // })
                                    // .catch((err) => {
                                    //     console.log("cannot find host id");
                                    //     return res.json({err:err,success:false});
                                    // })
                                    return res.json({ err: null, success: true, booking: new_booking });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.json({ err: err, success: false });
                                });
                            // return res.json({ err:null,success: true,booking:new_booking });


                        })
                        .catch(function(err){
                            console.log(err);
                            return res.json({err:err,success:false});
                        })
                    }
                }
                if(flag){
                    return res.status(400).json({err:"error with server",success:false});
                }
            }
            
            else{
                Booking.create(new_booking)
                    .then(function(){
                        console.log("inserted booking");
                        Guest.findByIdAndUpdate(user._id, { $push: { Bookings: new_booking } })
                                .then(() => {
                                    // DONT DELETE
                                    // Host.findByIdAndUpdate(listing.host.hostID,{$push:{bookings:new_booking}})
                                    // .then(() => {
                                    //     return res.json({ err: null, success: true, booking: new_booking });
                                    // })
                                    // .catch((err) => {
                                    //     console.log("cannot find host id");
                                    //     return res.json({err:err,success:false});
                                    // })
                                    return res.json({ err: null, success: true, booking: new_booking });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.json({ err: err, success: false });
                                });
                        // return res.json({err:null,success: true,booking:new_booking });

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        // res.render("error");
                        return res.status(400).json({err:"error while inserting",success:false});
                    })
            }
        })
        .catch((error) => {

            return res.status(400).json({success:false,err:"error while searching for doc "+error});
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({success:false,err:"couldn't complete request, try later"});
    }
}



exports.guestReportPost=async(req,res) => {
    try{
        const report=req.body.report;
        const user=req.body.user;
        // console.log(report);
        console.log(user);
        const new_report=new Report({
            guestID:user._id,//take user._id instead
            category:report.category,
            subject:report.subject,
            description:report.description,
        });
        // console.log(new_report);
        Report.create(new_report)
            .then(function(){
                // console.log("submited hehe");
                return res.json({success:true,error:null});
            })
            .catch(function(err){
                console.log(err);
                return res.json({success:false,err:err});
            })
        console.log("we here");
    }
    catch(err){
        res.json({err:err});
    }
}

exports.guestReviewPost = async (req, res) => {
    try {
        const { review, rating, listing } = req.body;

        // Create a review object containing both review and rating
        const reviewData = {
            review: review,
            rating: rating
        };
        
        // Find listing and insert review in listing
        Listing.findById(listing)
            .then(function (result) {
                if (!result) {
                    return res.status(404).json({ error: 'Listing not found' });
                }
                result.Reviews.push(reviewData);
                result.Ratings.push(rating);
                
                // Calculate average rating
                const averageRating = result.Ratings.reduce((total, currentValue) => total + currentValue, 0) / result.Ratings.length;
                result.AvgRating = averageRating; 
                
                return result.save();
            })
            .then(function (updatedListing) {
                res.status(200).json({ message: 'Review added successfully', listing: updatedListing });
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const stripe=require('stripe')(process.env.SECRET_KEY);

exports.guestCheckoutSession = async(req,res) => {
    
        const {listing,num_days} = req.body;


        const lineItems = [{
            price_data:{
                currency:"inr",
                product_data:{
                    name:listing.Title,
                    images:[listing.img_url1]
                },
                unit_amount:(listing.CostPerN)*num_days*100,
            },
            quantity:1
        }];

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/guest/success",
            cancel_url:"http://localhost:3000/guest/fail",
        });

        res.json({id:session.id})
}





