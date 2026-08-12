import mongoose from "mongoose";
import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import BusRoute from "../models/route.model";
import Student from "../models/student.model";
import Trip from "../models/trip.model";
import { DriverTypes } from "../types/types";
import tokenServices from "../utility/jwtTokenServices";

export class DriverServices {
  static async registerDriver(
    driverName: string,
    driverPhoneNo: number,
    busId: string
  ) {
    const driverExit = await Driver.findOne({ driverPhoneNo });

    if (driverExit) {
      return { success: false, message: "Driver Phone number already exits" };
    }

    const driverData: DriverTypes = {
      driverName,
      driverPhoneNo,
    };

    if (!mongoose.Types.ObjectId.isValid(busId)) {
      return { success: false, message: "Invalid Bus ID" };
    }

    if (busId) {
      const bus = await Bus.findById(busId);
      
      if (!bus) {
        return { success: false, message: "bus not found" };
      }
      driverData.assignedBus = {
        _id: bus._id,
        busNumber: bus.busNumber,
      };
    }

    const newDriver = await Driver.create(driverData);

    if (busId) {
      await Bus.findByIdAndUpdate(busId, {
        assignedDriver: {
          _id: newDriver._id,
          driverName: newDriver.driverName,
        },
      });
      
    }

    return { success: true, newDriver };
  }

  static async loginDriver(phoneNo: string) {
    const driver = await Driver.findOne({ driverPhoneNo: phoneNo });
    if (!driver) {
      return { success: false, message: "No, driver was registerd with this number." };
    }
    const accessToken = tokenServices.createJwtToken(driver._id);
    return { success: true, message: "Driver registerd with this number", accessToken, driverId: driver._id };
  }

  static async getAllDrivers() {
    const drivers = await Driver.find().populate("assignedBus");
    return { success: true, drivers };
  }

  static async getDriverById(id: string) {
    const driver = await Driver.findById(id).populate({path: 'assignedBus._id', select: 'assignedRoute' });
    if (!driver) {
      return { success: false, message: "driver not found" };
    }
    return { success: true, driver };
  }

  static async updateDriverById(
    id: string,
    driverName: string,
    driverPhoneNo: number,
    busId: string
  ) {
    const updatedPayload: DriverTypes = { driverName, driverPhoneNo };
    
    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return { success: false, message: "bus not found" };
      }
      updatedPayload.assignedBus = { _id: bus._id, busNumber: bus.busNumber };
    }

    const updatedDriver = await Driver.findByIdAndUpdate(id, updatedPayload, {
      new: true,
    });

    if (!updatedDriver) {
      return { success: false, message: "No driver found!" };
    }

    if (busId) {
      await Bus.findByIdAndUpdate(busId, {
        assignedDriver: {
          _id: updatedDriver._id,
          driverName: updatedDriver.driverName,
        },
      });

      
    }
    return { success: true, updatedDriver };
  }

  static async deleteDriverById(id: string) {
    const driver = await Driver.findById(id);
    if (!driver) {
      return { success: false, message: "driver not found" };
    }

    if (driver.assignedBus?._id) {
      await Bus.findByIdAndUpdate(driver.assignedBus?._id, {
        $unset: { assignedDriver: "" },
      });
    }

    await Driver.findByIdAndDelete(id);
    return { success: true };
  }

  static async getDriverDashboard(driverId: string) {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return { success: false, message: "Driver not found" };
    }

    let bus = null;
    let route = null;
    let studentsPerStop: { stopName: string; count: number; students: any[] }[] = [];
    let activeTrip = null;

    if (driver.assignedBus?._id) {
      bus = await Bus.findById(driver.assignedBus._id);

      if (bus?.assignedRoute?._id) {
        route = await BusRoute.findById(bus.assignedRoute._id);
      }

      // Get all students assigned to this bus
      const students = await Student.find({ "assignedBus._id": driver.assignedBus._id });

      // Group students by checkpoint (stop)
      const stopMap = new Map<string, any[]>();
      for (const student of students) {
        const stop = student.checkpoint || "Unassigned";
        if (!stopMap.has(stop)) {
          stopMap.set(stop, []);
        }
        stopMap.get(stop)!.push({
          _id: student._id,
          studentName: student.studentName,
          studentId: student.studentId,
        });
      }

      studentsPerStop = Array.from(stopMap.entries()).map(([stopName, studs]) => ({
        stopName,
        count: studs.length,
        students: studs,
      }));

      // Check for active trip
      activeTrip = await Trip.findOne({
        busId: driver.assignedBus._id,
        status: "started",
      });
    }

    return {
      success: true,
      dashboard: {
        driver: {
          _id: driver._id,
          driverName: driver.driverName,
          driverPhoneNo: driver.driverPhoneNo,
        },
        bus: bus
          ? {
              _id: bus._id,
              busNumber: bus.busNumber,
              busCapacity: bus.busCapacity,
            }
          : null,
        route: route
          ? {
              _id: route._id,
              routeName: route.routeName,
              locationsList: route.locationsList,
            }
          : null,
        studentsPerStop,
        activeTrip: activeTrip
          ? {
              _id: activeTrip._id,
              status: activeTrip.status,
              startedAt: activeTrip.startedAt,
              liveLocation: activeTrip.liveLocation,
            }
          : null,
      },
    };
  }
}
