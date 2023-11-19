require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;

const Admin=require('../models/Admin');
const Listing=require('../models/Listing');
const Guest=require('../models/Guest');
const Host=require('../models/Host');
const Report=require('../models/Report');

exports.adminLoginPost=async(req,res) => {
    try{
        const email=req.body.formvalues.email;
        const pass=req.body.formvalues.password;
        console.log(req.body);
        Admin.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                bcrypt.compare(pass,results[0].password,function(err,result){
                    
                    if(result){
                        return res.status(200).json({ exists: true,auth:true,error:null,user:results[0] });
                    }
                    else{
                        return res.status(200).json({ exists: false,error:'incorrect password' });
                    }
                    
                })
            }
            else{
                return res.status(200).json({ exists: false ,error:'user doesnt exist'});
            }
        })
        .catch(function(error){
            return res.status(500).send({message:err.message || "Error Occured"});
        })
    }
    catch(err){
        return res.status(500).send({message:err.message || "Error Occured"});
    }
}


exports.adminRegisterPost=async(req,res) => {
    try{
        const username=req.body.formvalues.username;
            const email=req.body.formvalues.email;
            const phone=req.body.formvalues.phone;
            const pass=req.body.formvalues.password;
            console.log(username);
            console.log(email);
    
    
            Admin.find({'Email':email})
            .then(function(results){
                console.log(results);
                if(results.length!=0){
                    // alert to change
                    return res.status(200).json({ exists: true,error:'email already in use'});
                }
                else{
                    // register user
                    bcrypt.hash(pass,saltRounds,function(err, hash){
                        const new_user=new Admin({
                            UserName:username,
                            Email:email,
                            PhoneNumber:phone,
                            password:hash
                        })
                        Admin.create(new_user)
                        .then(function(){
                            return res.status(200).json({ exists: false ,auth:true,error:null,user:new_user});
                        })
                        .catch(function(err){
                            return res.status(500).send({message:err.message || "Error Occured"});
                        })
                    
                    })
                    
    
                }
            })
        }
        catch(err){
            return res.status(500).send({message:err.message || "Error Occured"});
        }
}



exports.adminProfile=async(req,res) => {
    try{
        session=req.session;
        console.log('we here');
        if(session.userid) {
            Admin.findOne({'Email':session.userid})
                .then(function(result){
                })
                .catch(function(err){
                    console.log("error:"+err);
                })
        }
        else{
            res.redirect("/admin/login");
        }
    }
    catch(err){
        console.log("error:"+err);
    }
}

exports.adminEditPass=async(req,res) => {
    // get the user,new pass
    const oldpass=req.body.oldPassword;
    const newpass=req.body.newPassword;
    console.log("newpass:"+newpass);
    const userid=req.body.id;
    console.log(userid);
    Admin.findById(userid)
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
                        const updatedUser = await Admin.findByIdAndUpdate(
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
        return res.status(500).send({message:err.message || "Error Occured"});
    })

}

exports.adminHomePage=async(req,res) => {
    try{
            const results=await Listing.find({});
            res.json(results);
        // }
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminGuestlist=async(req,res) => {
    try{

        const results=await Guest.find({});
        res.json(results);
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminHostlist=async(req,res) => {
    try{
            const results=await Host.find({});
            res.json(results);        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminReports=async(req,res) => {
    try{
            const results=await Report.find({});
            res.json(results);

    }
    catch(err){
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
    console.log(x);
    Listing.find({$text:{$search:x}})
        .then(function(results){
            console.log("results:"+results);
            if(results.length!=0){
            }
            else {
                alert("no results");
                res.redirect("/admin/homepage");
            }
        })
        .catch(function(err){
            console.log(err);
        });
}

exports.adminDelete=async(req,res) => {
    try{

            const item=req.params.option;
            console.log("item:"+item);
            const id=req.body.id;
            console.log("id:"+id);
            if(item=='listing'){
                console.log("entered");
                Listing.findOneAndDelete({_id:id})
                .then(function(doc){
                    return res.json({err:null,msg:"listing deleted"});
                })
                .catch(function(err){
                    return res.json({err:err});
                })
            }
            else if(item=='guest'){
                Guest.findByIdAndDelete({_id:id})
                .then(function(doc){
                    return res.json({err:null,msg:"guest deleted"});
                })
                .catch(function(err){
                    return res.json({err:err});
                })
            }
            else if(item=='host'){
                Host.findByIdAndDelete({_id:id})
                .then(function(doc){
                    return res.json({err:null,msg:"host deleted"});
                })
                .catch(function(err){
                    return res.json({err:err});
                })
            }
            else if(item=='report'){
                Report.findByIdAndDelete({_id:id})
                .then(function(doc){
                    return res.json({err:null,msg:"report deleted"});
                })
                .catch(function(err){
                    return res.json({err:err});
                })
            }

    }
    catch(err){
        console.log("error : "+err);
    }
    

}

