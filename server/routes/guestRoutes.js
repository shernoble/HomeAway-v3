const express=require("express");
const router=express.Router();
const guestController=require("../controllers/guestController");


router.get('/homepage',guestController.guestHomePage);
router.get('/homepagefull',guestController.guestHomePageFull);
router.get('/reserve/:id',guestController.guestReserve);



router.post("/login",guestController.guestLoginPost);
router.post("/register",guestController.guestRegisterPost);
router.post("/startingPage",guestController.guestStartingPagePost);
router.post('/reserve/:id',guestController.guestReservePost);
router.post('/confirmBooking',guestController.guestConfirmBookingPost);
router.post('/search',guestController.guestSearch);
router.post('/filter',guestController.guestFilter);
router.post('/report',guestController.guestReportPost);
router.post('/editPass',guestController.guestEditPass);



module.exports=router;