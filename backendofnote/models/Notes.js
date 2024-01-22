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

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;