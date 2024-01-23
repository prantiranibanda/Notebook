import express from "express";
import fetchuser from "../middlewares/fetchuser.js";
import NotesModel from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
const ntsRouter =  express.Router();


ntsRouter.use(express.json());

//getting all notes using : Get "/api/nts/fetchnotes". login required
ntsRouter.get("/fetchnotes",fetchuser, async (req, res)=>{
    try {
        const notes = await NotesModel.find({user: req.abc.id})
        res.json(notes);
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//Adding notes using : POST "/api/nts/addnotes". login required
ntsRouter.post("/addnotes",fetchuser,[
    body('title', "Title is too short").isLength({ min: 2 }),
    body('description', "Description must be of atleast 5 characters").isLength({ min: 2 })
], 
async (req, res)=>{
    //if any error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {title, description, tag} = req.body;
        let note = await NotesModel.create({
            title: title,
            description: description,
            tag: tag,
            user: req.abc.id,
        })
        res.json(note); 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    } 
})

//Updating notes using : Put "/api/nts/updatenote". login required
ntsRouter.put("/updatenote/:id", fetchuser, 
async (req, res)=>{
    const {title, description, tag} = req.body;
    try{
        const newNote = {};
        if(title){newNote.title= title}
        if(description){newNote.description= description}
        if(tag){newNote.tag= tag}
    
        //checking if this user exists or not
        let note = await NotesModel.findById(req.params.id);
        if(!note){return res.status(404).send("user not exists");}
    
        //if exists then check wether the user is authentic
        if(note.user.toString() !== req.abc.id){return res.status(401).send("Not Allowed")}
    
        note = await NotesModel.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    } 
})
//Deleting notes using : Delete "/api/nts/deletenote". login required
ntsRouter.delete("/deletenote/:id", fetchuser, 
async (req, res)=>{
    try{
        //checking if this user exists or not
        let note = await NotesModel.findById(req.params.id);
        if(!note){return res.status(404).send("user does not exist");}
    
        //if exists then check wether the user is authentic
        if(note.user.toString() !== req.abc.id){return res.status(401).send("Not Allowed")}
    
        note = await NotesModel.findByIdAndDelete(req.params.id)
        res.json({note});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    } 
})

export default ntsRouter;