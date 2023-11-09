const express = require("express");
const router = express.Router();
const {login,signup} = require("../Contoller/Auth");
const{auth,isadmin,isstudent} = require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"successfull test"
    })
});

router.get("/student", auth, isstudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Student"
    })
});

// Protected Route for Admin 
router.get("/admin", auth, isadmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Admin"
    })
});


module.exports = router;