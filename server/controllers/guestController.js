require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;
const alert=require("alert");

// const myusername="user1";
// const mypassword="mypassword";
let session;


const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');
const Report=require('../models/Report');
const { MongoErrorLabel } = require('mongodb');



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
        // let val=false;
        // session=req.session;
        // if(session.userid) val=true;
        console.log("property:"+property_type);
        if(property_type !== undefined && property_type!=="All"){
            Listing.find({ PropertyType: property_type })
            .then(function(results){
                // res.render("guest-homepage",{All_listings:results,weather_bool:false,weather_location:"all",guests:0,userLoggedIn:val});
            })
            .catch(function(error){
                // res.render("error");
                return res.status(500).send({message:error.message || "Error Occured"});
            
            })
        }
        if(property_type ==undefined || property_type=="All"){
            Listing.find()
            .then(function(results){
                // res.render("guest-homepage",{All_listings:results,weather_bool:false,weather_location:"all",guests:0,userLoggedIn:val});
                res.json(results);
            })
            .catch(function(error){
                // res.render("error");
                // console.log(error);
                return res.status(500).send({message:error.message || "Error Occured"});
            })
        }
    }
    catch(error){
        // console.log("error:"+err);
        // res.render("error");
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


exports.guestHomePage=async(req,res) => {
    try{
        // res.json("we heree")
        // let val=false;
        // session=req.session;
        // if(session.userid) val=true;
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
                console.log("weather shit");
                res.json(results);
                // const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+process.env.WEATHER_API_KEY+"&units=metric";
                // fetch(url)
                //     .then(response => response.json())
                //         .then(weatherData => {
                //             // console.log(weatherData);
                //             const temp=weatherData.main.temp;
                //             // const temp2 = (temp - 32) * 5 / 9;
                //             const weatherDesc=weatherData.weather[0].description;
                //             const icon=weatherData.weather[0].icon;
                //             const icon_url="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                //             res.render("guest-homepage",{All_listings:results, weather_desc:weatherDesc,weather_temp:temp,weather_icon:icon_url,weather_location:place,weather_bool:true,guests:num_guests,userLoggedIn:val});
                //         })
                // .catch(error => {
                //     console.log("error",error);
                // })
            })
            .catch(function(error){
                return res.status(500).send({message:error.message || "Error Occured"});
            
            })
        
    }
    catch(err){
        return res.status(500).send({message:error.message || "Error Occured"});
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
                        return res.status(200).json({ exists: true,auth:true,error:null });
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
    const username=req.body.username;
        const email=req.body.email;
        const phone=req.body.phone;
        const pass=req.body.password;
        // console.log(username);
        // console.log(email);


        Guest.find({'Email':email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                // alert to change
                return res.status(200).json({ exists: true,error:'email already in use'});
            }
            else{
                // register user
                bcrypt.hash(pass,saltRounds,function(err, hash){
                    Guest.create({
                        UserName:username,
                        Email:email,
                        PhoneNumber:phone,
                        password:hash
                    })
                    .then(function(){
                        // res.redirect("/guest/login");
                        return res.status(200).json({ exists: false ,auth:false,error:null});
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

exports.guestLogout=async(req,res) => {
        console.log("session:"+req.session);
        req.session.destroy();
        console.log("session:"+req.session);
        res.redirect('/');
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
        const item=req.body.searchTerm;
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        console.log("term:"+item);
        // res.render("guest-login");
        Listing.find({$text:{$search:item}})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results,weather_bool:false,weather_location:"all",guests:0,userLoggedIn:val});
            })
            .catch(function(error){
                // res.status(500).send({message:error.message || "Error Occured"});
                console.log(error);
                res.render("error");
    
            })
    }
    catch(err){
        // res.status(500).send({message:err.message || "Error Occured"});
        console.log(err);
        res.render("error");
    }
}

exports.guestReserve=async(req,res) => {
    try{
        // get listingID
        // const id=req.params.id;
        // console.log("id:"+id);
        // session=req.session;
        // let val=false;
        // if(session.userid) val=true;
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
        // console.log("reserve post function");
        // // check sessions
        // session=req.session;
        const id=req.params.id;
        
        // console.log("session user:"+session.userid);
        // if(session.userid){
            console.log("hello user");
            
            console.log("reservation"+id);
            const ci = new Date(req.body.fromDate).getTime(); // Convert string to Date and get time
            const co = new Date(req.body.toDate).getTime();
            console.log('sd:'+req.body.fromDate);
            console.log('ed:'+co);

                const diffms=Math.abs(co-ci);
                const diffInDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
                Listing.find({_id:id})
                    .then(function(results){
                        // alert("working");
                        // console.log(results[0]);
                        res.json(null);
                        // res.render("guest-confirmation",{Listing:results[0],num_days:diffInDays, startDate:req.body.checkin,endDate:req.body.checkout,userLoggedIn:true});
                    })
                    .catch(function(err){
                        // render error page: NOT FOUND ERROR
                        res.status(500).send({message:err.message || "Error Occured"});
                        // console.log(err);
                        // res.render("error");
                    });
        // }
        // else{
        //     alert("you are required to login first");
        //     console.log("user not logged in");
        //     const queryParams={
        //         reserve_id:id
        //     }
        //     // pass reservation id and redirect to reservation page on login
        //     res.redirect("/guest/login?res_id="+id);
        // }
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

// exports.guestConfirmBooking=async(req,res) => {
//     // theres no 
// }

exports.guestConfirmBookingPost=async(req,res) => {
    try{
        // booking takes place
        // get data
    // create new booking object
    //add to data
    // session=req.session;
    // console.log("session user conf:"+session.userid);
    const { listing,checkin,checkout }=req.body;
    // console.log('listID:'+listID);
    // console.log('checkin:'+checkin);
    // console.log(host_id);

    // console.log('Listing:', listing);
    // console.log('Checkin:', checkin);
    // console.log('Checkout:', checkout);

    const date1=new Date(checkin);
    const date2=new Date(checkout);
    // console.log('date1:'+checkin);

    // console.log(req.query.startDate);
    // console.log('date2:'+checkout);
    let flag=false;
    const listid=listing._id;

    const new_booking=new Booking ({
        ListingID:listid,
        GuestID:"101",
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
                        // direct back to reservation page
                        // res.redirect(history.back());
                        
                        // console.log("booking dates not available.");
                        return res.json({err:"booking dates not available.",success:false});
                        // flag=true;
                        break;
                        // res.status(400).json({ success: false });
                        // break;
                    }
                
                    else if(i==documents.length-1){
                        Booking.create(new_booking)
                        .then(function(){
                            // console.log("inserted booking");
                            // Guest.find({'Email':session.userid})
                            //     .then(function(result){
                            //         // add booking to user profile
                            //         result.Bookings.push(new_booking);
                            //     })
                            //     .catch(function(err){
                            //         res.json({ success: false });
                            //     })
                            return res.json({ err:null,success: true });
                            
                            // res.render("congrats",{userLoggedIn:true});


                        })
                        .catch(function(err){
                            // console.log("error while inserting"+err);
                            // console.log(err);
                            return res.json({err:"error while inserting",success:false});
                            // res.render("error");
                        })
                    }
                }
                if(flag){
                    // const previousPage = req.headers.referer || '/';
                    // res.redirect(previousPage);
                    // console.log();
                    return res.status(400).json({err:"error with server",success:false});
                }
            }
            
            else{
                Booking.create(new_booking)
                    .then(function(){
                        console.log("inserted booking");

                        return res.json({success:true});

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        // res.render("error");
                        return res.status(400).json({err:"error while inserting",success:false});
                    })
            }
        })
        .catch((error) => {
            // console.log("error while searching for doc "+error);
            // res.render("error");
            return res.status(400).json({success:false,err:"error while searching for doc "+error});
        })

    }
    catch(err){
        console.log(err);
        // res.render("error");
        return res.status(400).json({success:false,err:"couldn't complete request, try later"});
    }
}

exports.guestReport=async(req,res) => {
    try{
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        res.render("guest-report",{userLoggedIn:val});
    }
    catch(err){
        console.log("err:"+err);
        res.render("error");
    }
}

exports.guestReportPost=async(req,res) => {
    try{
        // get vals
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        let category=req.body.category;
        console.log("cat:"+category);
        let desc=req.body.description;
        let subject=null
        if(category=="others"){
            subject=req.body.subject;
        }
        //create object
        // send it to mongodb
        // get user login as well

        const new_report=new Report({
            guestID:session.userid,
            category:category,
            subject:subject,
            description:desc
        });
        Report.create(new_report)
                    .then(function(){
                        console.log("report sent");
                        res.render("guest-report",{userLoggedIn:val});

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        res.render("error");
                    })

    }
    catch(err){
        console.log("err:"+err);
        res.render('error');
    }
}






