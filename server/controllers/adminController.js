require('../models/database');

const sessions = require("express-session");
const bcrypt=require("bcrypt");
const saltRounds=10;
// const passport=require("passport");
// const LocalStrategy = require('passport-local').Strategy;
const myusername="user1";
const mypassword="mypassword";
let session;

const alert=require("alert");

const Admin=require('../models/Admin');
const Listing=require('../models/Listing');
const Guest=require('../models/Guest');
const Host=require('../models/Host');
const Report=require('../models/Report');


exports.adminLogin=async(req,res) => {
    try{
        // res.render("admin-login");
    }
    catch(err){
        // res.render("error");
    }
}

exports.adminLoginPost=async(req,res) => {
    try{
        // check login creds
        const email=req.body.email;
        const pass=req.body.password;
        Admin.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                bcrypt.compare(pass,results[0].password,function(err,result){
                    
                    if(result){
                        // create session
                        session=req.session;
                        session.userid=email;
                        console.log(req.session);
                        res.redirect("/admin/homepage");
                    }
                    else{
                        console.log("incorrect password");
                        alert("incorrect password");
                        // res.render("admin-login");
                    }
                    
                })
            }
            else{
                console.log("no such user found");
                alert("no such user found");
                // res.render("admin-login");
            }
        })
        .catch(function(error){
            // res.render("error");
            console.log(error);
        })
    }
    catch(err){
        // res.render("error");
        console.log(err);
    }
}

exports.adminRegister=async(req,res) => {
    try{
        // res.render("admin-register");
    }
    catch(err){
        // res.render("error");
    }
}

exports.adminRegisterPost=async(req,res) => {
    try{
        const username=req.body.username;
            const email=req.body.email;
            const phone=req.body.phone;
            const pass=req.body.password;
            // console.log(username);
            // console.log(email);
    
    
            Admin.find({'Email':email})
            .then(function(results){
                console.log(results);
                if(results.length!=0){
                    // alert to change
                    alert("email already in use");
                    res.redirect("/admin/register");
                }
                else{
                    // register user
                    bcrypt.hash(pass,saltRounds,function(err, hash){
                        Admin.create({
                            UserName:username,
                            Email:email,
                            PhoneNumber:phone,
                            password:hash
                        })
                        .then(function(){
                            res.json({
                                status:"ok"
                            })
                            res.redirect("/admin/login");
                        })
                        .catch(function(err){
                            res.status(500).send({message:err.message || "Error Occured"});
                        })
                    
                    })
                    
    
                }
            })
        }
        catch(err){
            // res.render("error");
            console.log(err);
        }
}

exports.adminLogout=async(req,res) => {
    try{
        req.session.destroy();
        res.redirect('/');
    }
    catch(err){
        // res.render("error");
        console.log("error:"+err);
    }
}

exports.adminProfile=async(req,res) => {
    try{
        session=req.session;
        console.log('we here');
        if(session.userid) {
            Admin.findOne({'Email':session.userid})
                .then(function(result){
                    // res.render('admin-profile',{profile:result});
                })
                .catch(function(err){
                    // res.render("error");
                    console.log("error:"+err);
                })
        }
        else{
            // res.render("admin-login");
            res.redirect("/admin/login");
        }
    }
    catch(err){
        // res.render("error");
        console.log("error:"+err);
    }
}

exports.adminHomePage=async(req,res) => {
    try{
        // check login
        session=req.session;
        if(!session.userid) console.log("fre");
        // res.render('admin-register');
        // find listings
        else{
            const results=await Listing.find({});
            // res.render('admin-homepage',{All_listings:results});
        }
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminGuestlist=async(req,res) => {
    try{
        session=req.session;
        // if(!session.userid)  console.log("freg");
        // res.render('admin-register');
        // else{
            const results=await Guest.find({});
            // res.render('admin-guestlist',{guestList:results});
            res.json(results);
        // }
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminHostlist=async(req,res) => {
    try{
        session=req.session;
        if(!session.userid) console.log("sad");
        // res.render('admin-register');
        else{
            const results=await Host.find({});
            // res.render('admin-hostlist',{hostList:results});
        }
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminReports=async(req,res) => {
    try{
        session=req.session;
        // if(!session.userid) res.render('admin-register');
        // else{
        //     const results=await Report.find({});
        //     res.render('admin-reports',{report:results});
        // }
    }
    catch(err){
        // res.render("error");
        console.log("error : "+err);
    }
}

exports.adminSearchGuest=async(req,res) => {
    var x=req.body.search_ch;

    Guest.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                console.log(results);
                // res.render("admin-guestlist",{guestList:results});
            }
            else {
                alert("no results");
                res.redirect("/admin/guestList");
            }
        })
        .catch(function(err){
            console.log(err);
        });
}

exports.adminSearchHost=async(req,res) => {
    var x=req.body.search_ch;

    Host.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                console.log(results);
                // res.render("admin-hostlist",{hostList:results});
            }
            else {
                alert("no results");
                res.redirect("/admin/hostList");
            }
        })
        .catch(function(err){
            console.log(err);
        });
}

exports.adminSearchListing=async(req,res) => {
    var x=req.body.search_ch;
    // listingSchema.index({'Host.HostID':"text",'Address.State':"text",'Address.District':"text",'ListingID':"text",'Address.Pincode':"text",'Title':"text"});
    console.log(x);
    Listing.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            console.log("results:"+results);
            if(results.length!=0){
                // res.render("admin-homepage",{All_listings:results});
            }
            else {
                alert("no results");
                res.redirect("/admin/homepage");
            }
        })
        .catch(function(err){
            console.log(err);
            // res.render("error");
        });
}

exports.adminDelete=async(req,res) => {
    try{
        session=req.session;
        // if(!session.userid) res.render('admin-register');
        // else{
            const item=req.params.option;
            console.log("item:"+item);
            const id=req.body.elementID;
            console.log("id:"+id);
            if(item=='listing'){
                console.log("entered");
                Listing.findOneAndDelete({_id:id})
                .then(function(doc){
                    console.log("deleted item : "+doc);
                    res.redirect('/admin/homepage');
                })
                .catch(function(err){
                    res.status(500).send({message:err.message || "Error Occured"});
                })
            }
            else if(item=='guest'){
                Guest.findByIdAndDelete({_id:id})
                .then(function(doc){
                    console.log("deleted item : "+doc);
                    res.redirect('/admin/guestlist');
                })
                .catch(function(err){
                    res.status(500).send({message:err.message || "Error Occured"});
                })
            }
            else if(item=='host'){
                Host.findByIdAndDelete({_id:id})
                .then(function(doc){
                    console.log("deleted item : "+doc);
                    res.redirect('/admin/hostlist');
                })
                .catch(function(err){
                    res.status(500).send({message:err.message || "Error Occured"});
                })
            }
        // }
    }
    catch(err){
        // res.render("error");
        console.log("error : "+err);
    }
    

}

