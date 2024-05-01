/* stylelint-disable */
const express=require("express");
const router=express.Router();
const guestController=require("../controllers/guestController");
const stripe=require('stripe')(process.env.SECRET_KEY)


router.get('/homepage',guestController.guestHomePage);
router.get('/homepagefull',guestController.guestHomePageFull);
router.get('/reserve/:id',guestController.guestReserve);
router.get('/booking/:id',guestController.guestGetBooking);
router.get('/getBookings',guestController.getBookings);




router.post("/login",guestController.guestLoginPost);
router.post("/register",guestController.guestRegisterPost);
router.post("/startingPage",guestController.guestStartingPagePost);
router.post('/reserve/:id',guestController.guestReservePost);
router.post('/confirmBooking',guestController.guestConfirmBookingPost);
router.post('/search',guestController.guestSearch);
// router.post('/filter',guestController.guestFilter);
router.post('/report',guestController.guestReportPost);
router.post('/editPass',guestController.guestEditPass);
router.post('/review',guestController.guestReviewPost);
router.post('/cancelBooking',guestController.guestCancelBooking);
router.post('/create-checkout-session',guestController.guestCheckoutSession);



module.exports=router;