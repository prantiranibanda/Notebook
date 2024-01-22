import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const NotesModel = mongoose.model('user', NotesSchema);

export default NotesModel;