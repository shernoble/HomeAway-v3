const express=require("express");
const router = express.Router();
const Guest=require("../models/Guest");
require('../models/database');


    router.post('/register', async (req, res) => {
        console.log("idhar huu");
        try {
            const guest = await Guest.create({
                UserName: req.body.username,
                Email: req.body.email,
                PhoneNumber: req.body.phone,
                password:req.body.password,
                // confirmPassword:req.body.confirmPassword
            });
        
            await guest.save();
            res.send(guest);
            } catch (err) {
            console.log('[ERROR]');
            console.log(err.message);
            }
    });


    module.exports=router;