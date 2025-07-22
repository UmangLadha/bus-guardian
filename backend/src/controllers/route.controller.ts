import { Request, Response } from "express";
import BusRoute from "../models/route.model";

export class routeController {
  static async addRoute(req: Request, res: Response) {
    try {
      const { routeName, routeList } = req.body;
      if (!routeName || !routeList) {
        res.status(400).json({ message: "all fields are required" });
        return;
      }
      const routeData = {
        routeName,
        routeList,
      };
      const newRoute = await BusRoute.create(routeData);
      console.log("bus Route added successfully", newRoute);
      res.status(201).json({ message:"Bus route added successfully" , busRoute: newRoute});
      return;
    } catch (error) {
      console.log("error in creating busRoute",error);
        res.status(500).json({message:"unable to add busRoute"});
    }
  }

  static async getBusRoutes(req:Request, res:Response){
    try {
      const Routes = await BusRoute.find();
      res.status(201).json({message:"Data fetched Successfully", Routes});
      return;
    } catch (error) {
        res.status(500).json({message:"unable to fetch busRoute"});
        return;
    }
  }

  static async deleteRoute(req:Request, res:Response){
    try {
      const {id} = req.params;
      await BusRoute.findByIdAndDelete({_id:id});
      res.status(200).json({message:"Route deleted Successfully"});
      return;
    } catch (error) {
      console.log("error in deleting the bus route:", error);
      res.status(500).json({ message: "error in deleting the bus route" });
      return;
    }
  }
}
