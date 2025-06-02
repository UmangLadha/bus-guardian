import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    Username: {
        type: String,
        unique:true,
        required: true,
    },
    PhoneNo:{
        type: Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
})

const Admin = model("Admin", adminSchema);

export default Admin;