import {Schema, model} from "mongoose";

const busSchema = new Schema({
    busNumber:{ type: String, required: true, unique:true },
    busCapacity:{type: Number, required:true },
    busDriver:{
        type: Schema.Types.ObjectId,
        ref:"Driver"
    },
    busRoute:{
        type: Schema.Types.ObjectId,
        ref:"BusRoute"
    }
},{timestamps:true});

const Bus = model("Bus", busSchema);

export default Bus;