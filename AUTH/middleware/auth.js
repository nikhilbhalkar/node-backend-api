const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
     try {
        console.log(req.body);
        const token = req.body.token //|| req.cookies.token

        if(!token || token ==undefined){
            return res.status(401).json({
                success:false,
                message :"token is missing"
            });
        }
        //verify token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            });
        }
        next();
     } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while verifying token"
        });
     }
};


exports.isadmin = (req,res,next)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin you can not acces this"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"
        });
    }
};

exports.isstudent = (req,res,next)=>{
    try {
        if(req.user.role !=="Student"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Student you can not acces this"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"
        });
    }
};