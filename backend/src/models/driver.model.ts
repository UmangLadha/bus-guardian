import { Schema, model } from "mongoose";

const driverSchema = new Schema({
    driverId:{type:String, required:true, unique:true},
    driverName:{type:String, required:true},
    driverPhoneNo:{type:Number, required:true},
    busAssigned:{type:Schema.Types.ObjectId, ref:"Bus"},
},{timestamps:true});

const Driver = model("Driver", driverSchema);

export default Driver;