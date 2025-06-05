import { Schema, model } from "mongoose";

const driverSchema = new Schema({
    driverID:{type:String, required:true, unique:true},
    driverName:{type:String, required:true},
    driverPhoneNo:{type:Number, required:true},
    busAlloted:{type:String, required:true},
},{timestamps:true});

const Driver = model("Driver", driverSchema);

export default Driver;