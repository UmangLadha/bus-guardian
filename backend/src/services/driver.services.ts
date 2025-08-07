import mongoose from "mongoose";
import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import { DriverTypes } from "../types/types";
// import { generateIDFor } from "../utility/generateID";

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
      console.log("here is the bus Data: ", bus); ////////////////////////
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
      console.log("Driver details updated in bus also"); ///////////////////
    }

    return { success: true, newDriver };
  }

  static async loginDriver(driverId: string) {
    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      return { success: false, message: "Driver not found" };
    }
    return { success: true, driver };
  }

  static async getAllDrivers() {
    const drivers = await Driver.find().populate("assignedBus");
    return { success: true, drivers };
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

      console.log("Driver details updated in bus also"); ///////////////////
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
}
