import Bus from "../models/bus.model";
import Student from "../models/student.model";
import { StudentTypes } from "../types/types";
// import { generateIDFor } from "../utility/generateID";
// import { getLocationCoordinates } from "../utility/locationCordinates";

export class StudentServices {
  static async registerStudent(
    studentId:string,
    studentName: string,
    parentPhoneNo: number,
    busId: string,
    pickupAddress: string
  ) {
    const busNo = await Bus.findById(busId);
    if (!busNo) {
      return { success: false, message: "bus not found" };
    }
    // const locationCoordinate = await getLocationCoordinates(pickupAddress);
    // if (!locationCoordinate) {
    //   return { success: false, message: "unable to find the location" };
    // }
    // const studentId = generateIDFor("Parent");
    const newStudent = await Student.create({
      studentId,
      studentName,
      parentPhoneNo,
      busAssigned: busNo._id,
      pickupAddress,
      
    });
    return { success: true, newStudent };
  }

  static async loginStudent(studentId: string) {
    const existingStudent = await Student.findOne({ studentId });
    if (!existingStudent) {
      return { success: false, message: "unable to find Student" };
    }
    return { success: true, existingStudent };
  }

  static async getAllStudents() {
    const students = await Student.find();
    return { success: true, students };
  }

  static async updateStudentById(
    id: string,
    studentId:string,
    studentName: string,
    parentPhoneNo: number,
    busId: string,
    pickupAddress: string
  ) {
    const studentData: StudentTypes = {
      studentId,
      studentName,
      parentPhoneNo,
    };
    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return { success: false, message: "bus not found" };
      }
      studentData.busAssigned = bus._id;
    }
    // if (pickupAddress) {
    //   const locationCoordinate = await getLocationCoordinates(pickupAddress);
    //   if (!locationCoordinate) {
    //     return { success: false, message: "Unable to find the location" };
    //   }
    //   studentData.pickupAddress = pickupAddress;
    //   studentData.pickupLocation = {
    //     type: "Point",
    //     coordinates: [locationCoordinate.lon, locationCoordinate.lat],
    //   };
    // }
    const updatedStudent = await Student.findByIdAndUpdate(id, studentData, {
      new: true,
    });
    if (!updatedStudent) {
      return { success: false, message: "No student found!" };
    }
    return { success: true, updatedStudent };
  }

  static async deleteStudentById(id: string) {
    await Student.findByIdAndDelete(id);
    return { success: true };
  }
}
