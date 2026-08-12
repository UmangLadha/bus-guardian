import { Request, Response } from "express";
import { RouteServices } from "../services/route.services";

export class routeController {
  static async addRoute(req: Request, res: Response) {
    try {
      const { routeName, locationsList } = req.body;
      if (!routeName || !locationsList) {
        res.status(400).json({ message: "all fields are required" });
        return;
      }

      const result = await RouteServices.addRoute(routeName, locationsList);
      if (!result.success) {
        res.status(400).json({ message: "unable to add busRoute" });
        return;
      }
      res.status(201).json({ message: "Bus route added successfully", busRoute: result.newRoute });
      return;
    } catch (error) {
      res.status(500).json({ message: "unable to add busRoute" });
      return;
    }
  }

  static async getBusRoutes(req: Request, res: Response) {
    try {
      const result = await RouteServices.getBusRoutes();
      res.status(201).json({ message: "Data fetched Successfully", Routes: result.Routes });
      return;
    } catch (error) {
      res.status(500).json({ message: "unable to fetch busRoute" });
      return;
    }
  }

  static async getRouteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ message: "route id not found" });
        return;
      }

      const result = await RouteServices.getRouteById(id);
      if (!result.success) {
        res.status(404).json({ message: result.message });
        return;
      }

      res.status(200).json({ message: "Route data fetched ", route: result.route });
      return;
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
      return;
    }
  }

  static async updateRouteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { routeName, locationsList } = req.body;

      if (!routeName || !locationsList?.length) {
        res.status(400).json({ message: "Invalid input: routeName or routeList missing" });
        return;
      }

      const result = await RouteServices.updateRouteById(id, routeName, locationsList);
      if (!result.success) {
        res.status(401).json({ message: result.message });
        return;
      }

      res.status(200).json({ message: "Route updated successfully", data: result.updateRoute });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error in updating route" });
      return;
    }
  }

  static async deleteRoute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await RouteServices.deleteRoute(id);
      if (!result.success) {
        res.status(500).json({ message: result.message });
        return;
      }
      res.status(200).json({ message: "Route deleted Successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "error in deleting the bus route" });
      return;
    }
  }
}
