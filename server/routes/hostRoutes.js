// const express=require("express");
// const router=express.Router();
// const hostController=require("../controllers/hostController");

// // router.get("/congo",hostController.saveListing);
// // router.get("/getUserListings",hostController.getUserListings);
// router.get("/allaccommodations",hostController.hostAccommodations);
// // router.get("/accommodation",hostController.hostAccGet);

// // router.get("")

// router.post("/login",hostController.hostLoginPost);
// router.post("/register",hostController.hostRegisterPost);
// router.post("/newaccommodation",hostController.hostAccsPost);
// router.post("/report",hostController.hostReportPost);
// // router.post("/congo",hostController.saveListing);
// // router.post("/uploadimages",hostController.uploadimages);
// router.post("/editpass",hostController.hostEditPass);
// module.exports=router;

const express=require("express");
const router=express.Router();
const hostController=require("../controllers/hostController");

router.get("/congo",hostController.saveListing);
router.get("/getUserListings",hostController.getUserListings);
router.post("/login",hostController.hostLoginPost);
router.post("/register",hostController.hostRegisterPost);
router.post("/congo",hostController.saveListing);
router.post("/uploadimages",hostController.uploadimages);
router.post("/pass",hostController.hostEditPass);
router.post("/approveBooking",hostController.approveListing);

module.exports=router;