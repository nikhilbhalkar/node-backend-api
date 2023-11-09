const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visiter"]
    },

});

module.exports = mongoose.model("User",userschema);