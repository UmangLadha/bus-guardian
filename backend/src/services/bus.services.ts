import { Types } from "mongoose";
import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import { BusData } from "../types/types";
import Student from "../models/student.model";

export class BusServices {
  static async registerBus(
    busNumber: string,
    busCapacity: number,
    driverId: string
  ) {
    const busExit = await Bus.findOne({ busNumber });
    if (busExit) {
      return {
        success: false,
        message: "Bus already exits with this bus number",
      };
    }
    const busData: BusData = {
      busNumber,
      busCapacity,
    };
    if (driverId) {
      busData.busDriver = driverId;
    }
    const newBus = await Bus.create(busData);
    await Driver.findByIdAndUpdate(driverId, { busAssigned: newBus._id });
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
    driverId: string,
    busCapacity: number
  ) {
    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { busNumber, busDriver: driverId, busCapacity },
      { new: true }
    );
    if (!updatedBus) {
      return { success: false, message: "No bus found!" };
    }
    await Driver.findByIdAndUpdate(driverId, { busAssigned: id });
    return { success: true, updatedBus };
  }

  static async findAllBus() {
    const buses = await Bus.find();
    return { success: true, buses };
  }

  static async deleteBusById(id: string) {
    await Bus.findByIdAndDelete(id);
    return { success: true };
  }
}
