import Bus from "../models/bus.model";
import Student from "../models/student.model";

export class StudentServices {
  static async registerStudent(
    studentId: string,
    studentName: string,
    parentPhoneNo: number,
    busId: string,
    checkpoint: string
  ) {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return { success: false, message: "bus not found" };
    }
    const newStudent = await Student.create({
      studentId,
      studentName,
      parentPhoneNo,
      assignedBus: { _id: busId, busNumber: bus.busNumber },
      checkpoint,
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
    studentId: string,
    studentName: string,
    parentPhoneNo: number,
    busId: string,
    checkpoint: string
  ) {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return { success: false, message: "bus not found" };
    }
    const studentData = {
      studentId,
      studentName,
      parentPhoneNo,
      assignedBus: { _id: busId, busNumber: bus.busNumber },
      checkpoint,
    };
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
