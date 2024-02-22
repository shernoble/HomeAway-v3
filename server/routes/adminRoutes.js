const express=require("express");
const router=express.Router();
const adminController=require("../controllers/adminController");
// const passport=require("passport");



router.get("/homepage",adminController.adminHomePage);
router.get("/guestList",adminController.adminGuestlist);
router.get("/hostList",adminController.adminHostlist);
router.get("/reports",adminController.adminReports);
router.get("/reports/:id",adminController.adminGetReport);


// middleware=passport.authenticate('local')->local strategy
router.post("/login",adminController.adminLoginPost);
router.post("/register",adminController.adminRegisterPost);
router.post("/delete/:option",adminController.adminDelete);
router.post("/delete/report",adminController.adminDeleteReport);
router.post("/verify/guest",adminController.adminVerifyGuest);
router.post("/verify/host",adminController.adminVerifyHost);
router.post("/verify/listing",adminController.adminVerifyListing);
router.post("/listing/search",adminController.adminSearchListing);
router.post("/guest/search",adminController.adminSearchGuest);
router.post("/host/search",adminController.adminSearchHost);
router.post("/report/search",adminController.adminSearchReport);
router.post("/editPass",adminController.adminEditPass);
// router.post("/delete/:user",adminController.adminDeleteUser);




module.exports=router;