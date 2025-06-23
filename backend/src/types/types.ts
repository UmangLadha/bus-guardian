import { Types } from "mongoose";

export interface AdminUser {
  _id: Types.ObjectId;
  username: string;
  phoneNo: number;
  password: string;
}

export interface BusData{
  busNumber:string,
  busCapacity:number,
  busDriver?:string
}

export interface DriverTypes {
  driverId?: string;
  driverName: string;
  driverPhoneNo: number;
  busAssigned?: Types.ObjectId;
}

export interface StudentTypes{
  studentName:string, 
  parentContact:number, 
  busNumber?:string, 
  pickupAddress?:string,
  busAssigned?:Types.ObjectId,
  pickupLocation?:object
}
