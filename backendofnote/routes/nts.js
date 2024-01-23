import express from "express";
const ntsRouter =  express.Router();

ntsRouter.use(express.json());
ntsRouter.post("/",(req, res)=>{
    res.json([]);
})

export default ntsRouter;