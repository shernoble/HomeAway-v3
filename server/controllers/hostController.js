// require('../models/database');
// const bcrypt=require("bcrypt");
// const multer = require('multer');
// const saltRounds=10;
// const alert=require("alert");
// // const session = require('express-session');
// const Listing=require('../models/Listing');
// const Booking=require('../models/Booking');
// const Host = require('../models/Host');
// const path = require('path');
// const { log } = require('console');
// // const { ListingDetails } = require('../../client/src/components/ListingDetails/ListingDetails');


// exports.hostRegisterPost=async(req,res) => {
//     try{
//     const username=req.body.formvalues.username;
//         const email=req.body.formvalues.email;
//         const phone=req.body.formvalues.phone;
//         const pass=req.body.formvalues.password;
//         console.log(username);
//         console.log(email);


//         Host.find({'Email':email})
//         .then(function(results){
//             console.log(results);
//             if(results.length!=0){
//                 return res.status(200).json({ exists: true,auth:false,error:'email already in use'});
//             }
//             else{
//                 bcrypt.hash(pass,saltRounds,function(err, hash){
//                     const new_user=new Host({
//                         UserName:username,
//                         Email:email,
//                         PhoneNumber:phone,
//                         password:hash
//                     })
//                     Host.create(new_user)
//                     .then(function(){
//                         return res.status(200).json({ exists: false ,auth:true,error:null,user:new_user});
//                     })
//                     .catch(function(err){
//                         res.status(500).send({message:err.message || "Error Occured"});
//                     })
                
//                 })
                

//             }
//         })
//     }
//     catch(err){
//         res.status(500).send({message:err.message || "Error Occured"});
//     }
// }

// exports.hostLoginPost = async (req, res) => {
//     try{
//     // check login creds
//     // const res_id=req.query.res_id;
//     const email=req.body.formvalues.email;
//     const pass=req.body.formvalues.password;
//     console.log(req.body);
//     Host.find({'Email':email})
//     .then(function(results){
//         if(results.length!=0){
//             // check pass
//             bcrypt.compare(pass,results[0].password,function(err,result){
                
//                 if(result){
//                     return res.status(200).json({ exists: true,auth:true,error:null,user:results[0] });
//                 }
//                 else{
//                     return res.status(200).json({ exists: true,error:'incorrect password' });
//                 }
                
//             })
//         }
//         else{
//             return res.status(200).json({ exists: false ,error:'user doesnt exist'});
//         }
//     })
//     .catch(function(error){
//         return res.status(500).send({message:error.message || "Error Occured"});
//     })
// }
// catch(err){
//     return res.status(500).send({message:err.message || "Error Occured"});
// }
// };




// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '../../client/public/uploads/'), // Specify the directory where files should be uploaded
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 } // File size limit if needed
// }).array('images', 5);
// exports.uploadimages=async(req,res)=>{
//   upload(req, res, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error uploading files' });
//       } 
//       else {    
//         console.log(req.files);
//         res.status(200).json({ message: 'Files uploaded successfully' });
  
// }
// });
// }

// exports.saveListing = async (req, res) => {
//     try {
//       const TlistingData = req.body; // Assuming the data is sent in the request body
//       console.log(TlistingData);
  
//       // Retrieve host details from hosts database based on host email
//       const hostEmail = TlistingData.hostEmail;
//       const host = await Host.findOne({ Email: hostEmail });
  
//       // Create a new Listing object with combined data
//       const listing = new Listing({
//         img_url1: TlistingData.img_url1,
//         img_url2: TlistingData.img_url2,
//         img_url3: TlistingData.img_url3,
//         img_url4: TlistingData.img_url4,
//         img_url5: TlistingData.img_url5,
//         Title: TlistingData.ShortTitle,
//         Address: 
//         {
//             Line1:TlistingData.Street,
//             Line2:TlistingData.flat,
//             District:TlistingData.city,
//             State:TlistingData.state,
//             Pincode:TlistingData.pincode
//         },
//         host: {
//           hostID: host._id,
//           hostUserName: host.UserName,
//           hostEmail: host.Email,
//           hostPhone: host.PhoneNumber,
//         //   hostTotalListingsCount: host.listings.length, // Assuming you have a field for total listings count
//         },
//         Desc1: TlistingData.Description,
//         MaxGuests: TlistingData.guests,
//         CostPerN: TlistingData.Price,
//         Bedrooms: TlistingData.bedrooms,
//         Bathrooms: TlistingData.bathrooms,
//         PropertyType: TlistingData.PropertyType,
//         RoomType: TlistingData.RoomType,
//         Facilities: TlistingData.Amenities, // Add facilities data if available in listingData
//       });
  
//       // Save the listing to the database
//       await listing.save();
  
//       res.status(201).json({ message: 'Listing saved successfully', data: listing });
//     } catch (error) {
//       console.error('Error saving listing:', error);
//       res.status(500).json({ message: 'Failed to save listing' });
//     }
//   };

// exports.hostEditPass=async(req,res) => {
//     try{
//         // get the user,new pass
//         const oldpass=req.body.oldPassword;
//         const newpass=req.body.newPassword;
//         console.log("newpass:"+newpass);
//         const userid=req.body.id;
//         console.log(userid);
//         Host.findById(userid)
//         .then(function(result){
//             // check the 
//             bcrypt.compare(oldpass,result.password,function(err,result){
                    
//                 if(result){
//                     bcrypt.hash(newpass, saltRounds, async (err, hash) => {
//                         if (err) {
//                             return res.status(500).send({ success:false,message: 'Error hashing password' });
//                         }
            
//                         try {
//                             // Find the guest user by ID and update the password
//                             const updatedUser = await Host.findByIdAndUpdate(
//                                 userid,
//                                 { password: hash },
//                                 { new: true } // Return the updated document
//                             );
//                             if (!updatedUser) {
//                                 return res.status(404).send({ success:false,message: 'User not found' });
//                             }
//                             console.log("pass updated");
//                             return res.status(200).send({success:true, message: 'Password updated successfully' });
//                         } catch (error) {
//                             return res.status(500).send({success:false, message: 'Error updating password' });
//                         }
//                     });
//                 }
//                 else{
//                     return res.status(200).json({ success: false,message:'incorrect password' });
//                 }
                
//             })
//         })
//         .catch(function(err){
//             return res.json({err:err});
//         })

//     }
//     catch(err){
//         return res.status(500).send({message:err.message || "Error Occured"});
//     }
// }

// // host homepage-bookings page->fetch the listings from the host only, stored in array
// // get all the host accommodations
// exports.hostAccommodations = async(req,res) => {
//     try{
//         const id=req.body.id;
//         console.log(id);
//         Listing.find({'host.hostID':id})
//         .then(function(results){
//             if(results.length==0){
//                 return res.status(200).json({results:null});
//             }
//             else{
//                 return res.status(200).json({results:results});
//             }
//         })
//         .catch(function(error){
//             return res.status(500).send({message:error.message || "Error Occured"});
//         })
//     }
//     catch(err){
//         return res.status(500).send({message:err.message || "Error Occured"});
//     }
// }
// // posting a new accommodation
// exports.hostAccsPost = async(req,res) => {
//     try{
//         // receive form values
//         // create object
//         // insert object into mongodb
//         // send listing with proper schema names n everything
//         const listing=req.body.listing;
//         const new_listing=new Listing(listing);
//         Listing.create(new_listing)
//         .then(function(){
//             return res.status(200).json({success:true, message:'listing created successfully'});
//         })
//         .catch(function(err){
//             return res.status(500).json({success:false,message:err.message || "Error Occured"});
//         })
//     }
//     catch(err){
//         return res.status(500).json({success:false,message:err.message || "Error Occured"});
//     }
// }

// exports.hostReportPost=async(req,res) => {
//     try{
//         const report=req.body.report;
//         const user=req.body.user;
//         // console.log(report);
//         console.log(user);
//         const new_report=new Report({
//             guestID:user._id,//take user._id instead
//             category:report.category,
//             subject:report.subject,
//             description:report.description,
//         });
//         // console.log(new_report);
//         Report.create(new_report)
//             .then(function(){
//                 // console.log("submited hehe");
//                 return res.json({success:true,error:null});
//             })
//             .catch(function(err){
//                 console.log(err);
//                 return res.json({success:false,err:err});
//             })
//         console.log("we here");
//     }
//     catch(err){
//         res.json({err:err});
//     }
// }


// // fetch a particular booking's details
// // WHY?? NO NEED
// // exports.hostBookingDetails=async(req,res) => {
// //     try{
// //         // get booking id-search
// //         const id=req.body.id;
// //         // fetch directly from bookings?-ok
// //         Booking.find({_id:id})
// //         .then(function(){

// //         })
// //         .catch(function(err){

// //         })
        

// //     }
// //     catch(err){

// //     }
// // }

// // confirm booking
// exports.hostConfirmBooking=async(req,res) => {
//     try{

//     }
//     catch(err){

//     }
// }

// // post
// exports.hostEditAccommodation=async(req,res)=>{
//     try{
//         // update everything, dont pick out on specific stuff to update

//     }
//     catch(err){

//     }
// }

// // get full details of specific accommodation
// // exports.hostAccGet=async(req,res)=>{
// //     try{
// //         const id=req.body.id;
// //         ListingDetails.findOne({_id:id})
// //         .then(function(result){
// //             if(!result) return res.json({success:true,listing:null});
// //             else return res.json({success:true,listing:result});
// //         })
// //         .catch(function(err){
// //             console.log(err);
// //             return res.json({success:false,err:err});
// //         })
// //     }
// //     catch(err){
// //         console.log(err);
// //         return res.json({success:false,err:err});
// //     }
// // }






// exports.getUserListings = async (req, res) => {
//     try {
//         const userEmail = "saiswetha.m21@iiits.in";
//         console.log(userEmail);
//         const user = await Host.findOne({ Email: userEmail });
//         console.log(user);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
    
//         const userlistings = await Listing.find({ 'host.hostEmail': userEmail });
//         console.log(userlistings);
//         res.status(200).json({ houseinfo: userlistings });
//         } catch (error) {
//         console.error('Error fetching user listings:', error);
//         res.status(500).json({ message: 'Failed to fetch user listings' });
//     }
// };


require('../models/database');
const bcrypt=require("bcrypt");
const multer = require('multer');
const saltRounds=10;
const alert=require("alert");
const Listing=require('../models/Listing');
const Host=require('../models/Host');
const path = require('path');


exports.hostRegisterPost=async(req,res) => {
    try{
    const username=req.body.formvalues.username;
        const email=req.body.formvalues.email;
        const phone=req.body.formvalues.phone;
        const pass=req.body.formvalues.password;
        console.log(username);
        console.log(email);


        Host.find({'Email':email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                return res.status(200).json({ exists: true,auth:false,error:'email already in use'});
            }
            else{
                bcrypt.hash(pass,saltRounds,function(err, hash){
                    const new_user=new Host({
                        UserName:username,
                        Email:email,
                        PhoneNumber:phone,
                        password:hash
                    })
                    Host.create(new_user)
                    .then(function(){
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

exports.hostLoginPost=async(req,res) => {
  try{
      // check login creds
      // const res_id=req.query.res_id;
      const email=req.body.formvalues.email;
      const pass=req.body.formvalues.password;
      console.log(req.body);
      Host.find({'Email':email})
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






const storage = multer.diskStorage({
  destination: path.join(__dirname, '../client/public/uploads/'), // Specify the directory where files should be uploaded
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // File size limit if needed
}).array('images', 5);
exports.uploadimages=async(req,res)=>{
  upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading files' });
      } 
      else {    
        console.log(req.files);
        res.status(200).json({ message: 'Files uploaded successfully' });
  
}
});
}

exports.approveListing = async(req,res) => {
    // get id of booking, update booking in db

    const id=req.body;
    const new_booking=Booking.findByIdAndUpdate(
        id,
        {Status:"approved"}
        )
        if (!new_booking) {
            return res.status(404).send({ success:false,message: 'User not found' });
        }
        console.log("status updated");
        return res.status(200).send({success:true, message: 'booking approved' });

}
exports.saveListing = async (req, res) => {
    try {
        const TlistingData = req.body.listingData; // Assuming the data is sent in the request body

        // Retrieve host details from hosts database based on host email
        const hostEmail = TlistingData.hostEmail;
        const host = await Host.findOne({ Email: hostEmail });

        // Ensure that the host document is found
        if (!host) {
            return res.status(404).json({ message: 'Host not found' });
        }

        // Create a new Listing object with combined data
        const listing = new Listing({
            img_url1: TlistingData.img_url1,
            img_url2: TlistingData.img_url2,
            img_url3: TlistingData.img_url3,
            img_url4: TlistingData.img_url4,
            img_url5: TlistingData.img_url5,
            Title: TlistingData.ShortTitle,
            Address: {
                Line1: TlistingData.Street,
                Line2: TlistingData.flat,
                District: TlistingData.city,
                State: TlistingData.state,
                Pincode: TlistingData.pincode
            },
            host: {
                hostID: host._id,
                hostUserName: host.UserName,
                hostEmail: host.Email,
                hostPhone: host.PhoneNumber,
                // hostTotalListingsCount: host.listings.length, // Assuming you have a field for total listings count
            },
            Desc1: TlistingData.Description,
            MaxGuests: TlistingData.guests,
            CostPerN: TlistingData.Price,
            Bedrooms: TlistingData.bedrooms,
            Bathrooms: TlistingData.bathrooms,
            PropertyType: TlistingData.PropertyType,
            RoomType: TlistingData.RoomType,
            Facilities: TlistingData.Amenities, // Add facilities data if available in listingData
        });

        // Save the listing to the database
        await listing.save();

        res.status(201).json({ message: 'Listing saved successfully', data: listing });
    } catch (error) {
        console.error('Error saving listing:', error);
        res.status(500).json({ message: 'Failed to save listing' });
    }
};


 exports.hostEditPass=async(req,res) => {
     try{
        // get the user,new pass
        const oldpass=req.body.oldPassword;
        const newpass=req.body.newPassword;
        console.log("newpass:"+newpass);
        const userid=req.body.id;
        console.log(userid);
        Host.findById(userid)
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
                            const updatedUser = await Host.findByIdAndUpdate(
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
  


  exports.getUserListings = async (req, res) => {
    try {
      const userEmail = "saiswetha.m21@iiits.in";
      console.log(userEmail);
      const user = await Host.findOne({ Email: userEmail });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userlistings = await Listing.find({ 'host.hostEmail': userEmail });
     console.log(userlistings);
      res.status(200).json({ houseinfo: userlistings });
    } catch (error) {
      console.error('Error fetching user listings:', error);
      res.status(500).json({ message: 'Failed to fetch user listings' });
    }
  };
  



// exports.hostLogout=async(req,res) => {
//     req.session.destroy();
//     res.redirect('/');
// }
