import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import { DriverTypes } from "../types/types";
import { generateIDFor } from "../utility/generateID";

export class DriverServices {
  static async registerDriver(
    driverName: string,
    driverPhoneNo: number,
    busNumber: string
  ) {
    const driverExit = await Driver.findOne({ driverPhoneNo });
    if (driverExit) {
      return { success: false, message: "phoneNo already exits" };
    }
    const uniqueID = generateIDFor("Driver");
    const driverData: DriverTypes = {
      driverId: uniqueID,
      driverName,
      driverPhoneNo,
    };
    if (busNumber) {
      const bus = await Bus.findOne({ busNumber });
      if (!bus) {
        return { success: false, message: "bus not found" };
      }
      driverData.busAssigned = bus._id;
    }
    const newDriver = await Driver.create(driverData);
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
    const drivers = await Driver.find().populate("busAssigned");
    return { success: true, drivers };
  }

  static async updateDriverById(
    id: string,
    driverName: string,
    driverPhoneNo: number,
    busNumber: string
  ) {
    const updatedPayload: DriverTypes = { driverName, driverPhoneNo };
    if (busNumber) {
      const bus = await Bus.findOne({ busNumber });
      if (!bus) {
        return { success: false, message: "bus not found" };
      }
      updatedPayload.busAssigned = bus._id;
      await Bus.findByIdAndUpdate(bus._id, { busDriver: id });
    }
    const updatedDriver = await Driver.findByIdAndUpdate(id, updatedPayload, {
      new: true,
    });
    if (!updatedDriver) {
      return { success: false, message: "No driver found!" };
    }

    return { success: true, updatedDriver };
  }

  static async deleteDriverById(id: string) {
    await Bus.findByIdAndDelete(id);
    return { success: true };
  }
}
