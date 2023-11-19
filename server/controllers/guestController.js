require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;
const alert=require("alert");

let session;


const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');
const Report=require('../models/Report');

exports.guestStartingPage=async(req,res) => {
    try{
        res.render("guest-startingPage");
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}
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

exports.guestProfile=async(req,res) => {
    try{
        // get bookings also

        session=req.session;
        if(session.userid){
            // find user and send details
            Guest.findOne({'Email':session.userid})
                .then(function(results){
                    console.log(results);
                    Booking.find({'GuestID':session.userid})
                        .then(function(docs){
                        
                            res.render("guest-profile",{profile:results,bookings:docs,userLoggedIn:true});

                        })
                        .catch(function(err){
                            res.render("error");
                            console.log(err);
                        })
                })
                .catch(function(error){
                    res.render("error");
                    console.log(error);
                })
            
        }
        else{
            res.render("guest-login");
        }
    }
    catch(error){
        res.render("error");
        console.log(error);
    }
}

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


exports.guestFilter=async(req,res) => {
    const ch=req.body.choice;
    const place=req.query.location;
    const num_guests=req.query.guests;
    if(place !== undefined && place!="all"){
        res.redirect("/guest/homepage/?location="+place+"&guests="+num_guests+"&property="+ch);
    }
    else{
        res.redirect("/guest/homepagefull/?property="+ch);
    }
    
}

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
    const { listing,checkin,checkout,user }=req.body;

    const date1=new Date(checkin);
    const date2=new Date(checkout);
    let flag=false;
    const listid=listing._id;

    const new_booking=new Booking ({
        ListingID:listid,
        GuestID:user._id,
        HostID:listing.host.hostID,
        FromDate:date1,
        ToDate:date2,
    });
    
    Booking.find({ListingID:listid})
        .then((documents) => {
            console.log(documents);
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
                            return res.json({ err:null,success: true,booking:new_booking });


                        })
                        .catch(function(err){
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

                        return res.json({err:null,success: true,booking:new_booking });

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
                return res.json({error:null});
            })
            .catch(function(err){
                console.log(err);
                return res.json({err:err});
            })
        console.log("we here");
    }
    catch(err){
        res.json({err:err});
    }
}






