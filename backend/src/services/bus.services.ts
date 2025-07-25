import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import Student from "../models/student.model";
import BusRoute from "../models/route.model";
import { BusData } from "../types/types";

export class BusServices {
  static async registerBus(
    busNumber: string,
    busCapacity: number,
    busDriverId: string,
    busRouteId: string
  ) {
    const busExists = await Bus.findOne({ busNumber });
    if (busExists) {
      return {
        success: false,
        message: "Bus already exists with this bus number",
      };
    }

    const busData: BusData = {
      busNumber,
      busCapacity,
    };

    if (busDriverId) {
      const driver = await Driver.findById(busDriverId);
      if (!driver) {
        return { success: false, message: "Driver not found" };
      }
      busData.assignedDriver = {
        _id: driver._id,
        driverName: driver.driverName,
      };
    }

    if (busRouteId) {
      const route = await BusRoute.findById(busRouteId);
      if (!route) {
        return { success: false, message: "Route not found" };
      }
      busData.assignedRoute = {
        _id: route._id,
        busRoute: route.routeName,
      };
    }

    const newBus = await Bus.create(busData);

    if (busDriverId) {
      await Driver.findByIdAndUpdate(busDriverId, {
        assignedBus: {
          _id: newBus._id,
          busNumber: newBus.busNumber,
        },
      });
    }

    if (busRouteId) {
      await BusRoute.findByIdAndUpdate(busRouteId, {
        assignedBus: {
          _id: newBus._id,
          busNumber: newBus.busNumber,
        },
      });
    }

    return { success: true, newBus };
  }

  static async getBusById(id: string) {
    const busData = await Bus.findById(id).populate("busDriver");
    const students = await Student.find({ busAssigned: id });

    if (!busData) {
      return { success: false, message: "Bus not found" };
    }

    return { success: true, busData, students };
  }

  static async updateBusById(
    id: string,
    busNumber: string,
    busDriverId: string,
    busRouteId: string,
    busCapacity: number
  ) {
    const driver = await Driver.findById(busDriverId);
    const route = await BusRoute.findById(busRouteId);

    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      {
        busNumber,
        busCapacity,
        assignedDriver: driver
          ? { _id: driver._id, driverName: driver.driverName }
          : undefined,
        assignedRoute: route
          ? { _id: route._id, busRoute: route.routeName }
          : undefined,
      },
      { new: true }
    );

    if (!updatedBus) {
      return { success: false, message: "No bus found!" };
    }

    if (driver) {
      await Driver.findByIdAndUpdate(busDriverId, {
        assignedBus: {
          _id: updatedBus._id,
          busNumber: updatedBus.busNumber,
        },
      });
    }

    return { success: true, updatedBus };
  }

  static async findAllBus() {
    const buses = await Bus.find();
    return { success: true, buses };
  }

  static async deleteBusById(id: string) {
    const bus = await Bus.findById(id);
    if (!bus) {
      return { success: false, message: "Bus not found" };
    }

    if (bus.assignedDriver?._id) {
      await Driver.findByIdAndUpdate(bus.assignedDriver._id, {
        $unset: { assignedBus: "" },
      });
    }

    if (bus.assignedRoute?._id) {
      await BusRoute.findByIdAndUpdate(bus.assignedRoute._id, {
        $unset: { assignedBus: "" },
      });
    }

    await Bus.findByIdAndDelete(id);

    return {
      success: true,
      message: "Bus and all references deleted successfully",
    };
  }
}
