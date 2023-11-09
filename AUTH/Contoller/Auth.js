const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken")

exports.signup = async(req,res)=>{
    try 
    {
        const {name,email,password,role} = req.body
        const existinguser = await User.findOne({email});
        console.log(name);
        if(existinguser){
            return res.status(400).json({
                success :false,
                message:"User already exist"
            });
        }
        let hsshedpassword;
        try
         {
            hsshedpassword = await bcrypt.hash(password,10);
            
        } catch (error)
         {
            return res.status(500).json({
                success :false,
                message:"Error in hashing pasword"
            })  ;
        }
        const user = await User.create({name,email,password:hsshedpassword,role});

        return res.status(200).json({
            success :true,
            message:"User created successfully"
        })
    } catch (error)
     {
         console.log("error while signup user");
         console.error(error)  
    }
};



exports.login = async (req ,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill the all details.."
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            });
        }
        const payload = {
            email : user.email,
            id : user._id,
            role:user.role
        };

        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"}
            );

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const option = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }

           // res.cookie("token",token,option).status(200).json({
             //   success : true,
               // token,
                //user,
               // message:"User loggedin successfully"
            //});
            res.status(200).json({
                success : true,
                token,
                user,
                message:"User loged in successfully"
            });
        }else{
               return res.status(403).json({
                success:false,
                message:"password does not match"
               }) ;
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login false"
        });
    }
};