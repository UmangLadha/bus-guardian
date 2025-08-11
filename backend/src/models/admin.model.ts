import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        unique:true,
        required: true,
    },
    phoneNo:{
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
    {timestamps: true}
);

const Admin = model("Admin", adminSchema);

export default Admin; 