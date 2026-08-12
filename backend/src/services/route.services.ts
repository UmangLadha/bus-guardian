import BusRoute from "../models/route.model";
import Bus from "../models/bus.model";
import { getLocationCoordinates } from "../utility/locationCordinates";

export class RouteServices {
  static async addRoute(routeName: string, locationsList: string[]) {
    const enhancedRouteList = await Promise.all(
      locationsList.map(async (locationName: string) => {
        const location = await getLocationCoordinates(locationName);
        if (!location) throw new Error(`Invalid address: ${locationName}`);
        return {
          locationName,
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        };
      })
    );
    const routeData = {
      routeName,
      locationsList: enhancedRouteList,
    };
    const newRoute = await BusRoute.create(routeData);
    return { success: true, newRoute };
  }

  static async getBusRoutes() {
    const Routes = await BusRoute.find();
    return { success: true, Routes };
  }

  static async getRouteById(id: string) {
    const route = await BusRoute.findById(id).populate("assignedBus");
    if (!route) {
      return { success: false, message: "Route not found" };
    }
    return { success: true, route };
  }

  static async updateRouteById(id: string, routeName: string, locationsList: string[]) {
    const enhancedRouteList = await Promise.all(
      locationsList.map(async (locationName: string) => {
        const location = await getLocationCoordinates(locationName);
        if (!location) throw new Error(`Invalid address: ${locationName}`);
        return {
          locationName,
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        };
      })
    );

    const updateRoute = await BusRoute.findByIdAndUpdate(
      id,
      { routeName, locationsList: enhancedRouteList },
      { new: true }
    );

    if (!updateRoute) {
      return { success: false, message: "Route not found" };
    }

    await Bus.findOneAndUpdate(
      { assignedRoute: { _id: id } },
      { assignedRoute: { routeName: updateRoute.routeName } }
    );

    return { success: true, updateRoute };
  }

  static async deleteRoute(id: string) {
    const route = await BusRoute.findById(id);
    if (!route) {
      return { success: false, message: "route not found" };
    }

    await Bus.updateMany(
      { "assignedRoute._id": id },
      { $unset: { assignedRoute: "" } }
    );

    await BusRoute.findByIdAndDelete(id);
    return { success: true };
  }
}
