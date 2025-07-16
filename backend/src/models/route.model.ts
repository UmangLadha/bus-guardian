import { model, Schema } from "mongoose";

const busRouteSchema = new Schema({
    routeName: {type: String, unique:true, required:true},
    routeList: {type:Array, required:true} 
},{timestamps:true});

const BusRoute = model("BusRoute", busRouteSchema);

export default BusRoute;