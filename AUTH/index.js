const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./config/database").connect();

PORT = process.env.PORT || 3000
const user = require("./routes/user");
app.use("/api/v1",user);

app.get("/", (req,res) => {
     return res.status(200).json({
          success :true,
          message:"app is working"
      })  ;
 })
app.listen(PORT,()=>{
     console.log("Server is activated on port ",PORT);
});