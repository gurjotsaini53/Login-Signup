const express = require("express");
const app = express();
const port = 8000;
const connectDb = require("./db/dbConnect");
const User = require("./db/user");
const cors = require('cors');

app.use(cors());

//Middleware for parsing data
app.use(express.json());

//Registration
app.post("/signup", async (req, res) => {
  try {
    const { name,email,username, password } = req.body;
    console.log(name,email,username, password);
    await User.create({ name,email,username, password }).then((data) => {
      //console.log(data);
      //console.log("added succesfully");
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Registration failed"});
  }
});

app.post("/signin",async(req,res)=>{
  try{
    const {username,password}= req.body;
    const user = await User.findOne({username});

    if(!user){
      return res.status(401).json({error:"Username doesn't exist"});
    }
    if(user.password !== password){
      return res.status(401).json({error:"Inavlid Credentials"});
    }

    res.status(200).json({message:"Logged In as "+user.name});
  }catch(error){
    console.log(error.message);
    res.status(500).json({error:"Login Failed"});
  }
});

app.post("/forgotpswd",async(req,res)=>{
  try{
    const{username,email,pswd}=req.body;
    const user = await User.findOne({username});

    if(!user){
      return res.status(401).json({error:"Username doesn't exist"});
    }
    if(user.email !== email){
      return res.status(401).json({error:"Cannot validate the email - Wrong enail with username"});
    }
    user.password=pswd;
    await user.save();

    res.status(200).json({message:"Password changed successfully"});
  }catch(error){
    console.log(error.message);
    res.status(500).json({error:"Login Failed"});
  }
});

connectDb();

app.listen(port, () => {
  console.log("Server listening");
});