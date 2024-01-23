import express from "express";
import { body, validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = "Prantiispranti";
const authRouter =  express.Router();

authRouter.use(express.json());
//Creating user using : POST "/api/auth/createuser". No login required
authRouter.post("/createuser",[
  body('name', "Name is too short").isLength({ min: 2 }),
  body('email', "Enter valid email").isEmail(),
  body('password', "Enter valid password").isLength({ min: 5 })
],
async (req, res)=>{
  //if any error return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
  //check wether the user with same email exists
    let user = await UserModel.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({ errors: "User already exists with same email" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
  //Creating a user which also saves the data in mongodb
    user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken});
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
})

export default authRouter;