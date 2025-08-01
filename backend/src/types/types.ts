import { Types } from "mongoose";

// admin service type
export interface AdminUser {
  _id: Types.ObjectId;
  email: string;
  phoneNo: number;
  password: string;
}

// bus service types
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

// driver service types
export interface DriverTypes {
  driverId?: string;
  driverName: string;
  driverPhoneNo: number;
  assignedBus?: { _id: Types.ObjectId | string; busNumber: String };
}

// student service types
export interface StudentTypes {
  studentName: string;
  parentContact: number;
  busNumber?: string;
  pickupAddress?: string;
  busAssigned?: Types.ObjectId | string;
  pickupLocation?: object;
}
