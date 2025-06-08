import {Schema, model} from "mongoose";

const busSchema = new Schema({
    busNumber:{ type: String, required: true, unique:true },
    busCapacity:{type: Number, required:true },
    busDriver:{
        type: Schema.Types.ObjectId,
        ref:"Driver"
    }
});

const Bus = model("Bus", busSchema);

export default Bus;