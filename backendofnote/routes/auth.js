import express from "express";
import { body, validationResult } from 'express-validator';
import UserModel from '../models/User.js';

const authRouter =  express.Router();

authRouter.use(express.json())
authRouter.post("/",[
  body('name', "Name is toooo short").isLength({ min: 2 }),
  body('email', "Enter valid email").isEmail(),
  body('password', "Enter valid password").isLength({ min: 5 })
],
(req, res)=>{
  //res.json(req.body);
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user)).catch(err=> {
      console.log(err);
      res.json({error: 'Pleaseeee', message: err.message})
    });
})

export default authRouter;