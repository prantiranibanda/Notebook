import mongoose from "mongoose";
const mongoUrl = "mongodb://127.0.0.1:27017/noteDB";

const mongoConnect = async ()=>{
  await mongoose.connect(mongoUrl).then(()=>{
    console.log("Connected successfully");
  })
};

export default mongoConnect;