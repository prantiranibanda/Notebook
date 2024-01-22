import express from 'express';
import mongoConnect from './dbconnect.js';
import UserModel from './models/User.js';

const app = express();
const port = 5000;
mongoConnect();


app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})