import { Types } from "mongoose";

export interface AdminUser {
  _id: Types.ObjectId;
  email: string;
  phoneNo: number;
  password: string;
}

export interface BusData {
  busNumber: string;
  busCapacity: number;
  assignedDriver?: {
    _id: Types.ObjectId | string;
    driverName: string;
  };
  assignedRoute?: {
    _id: Types.ObjectId | string;
    busRoute: string;
  };
}

export interface DriverTypes {
  driverId?: string;
  driverName: string;
  driverPhoneNo: number;
  assignedBus?: { _id: Types.ObjectId; busNumber: String };
}

export interface StudentTypes {
  studentName: string;
  parentContact: number;
  busNumber?: string;
  pickupAddress?: string;
  busAssigned?: Types.ObjectId;
  pickupLocation?: object;
}
