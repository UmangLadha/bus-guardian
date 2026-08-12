import Bus from "../models/bus.model";
import Student from "../models/student.model";
import Driver from "../models/driver.model";
import BusRoute from "../models/route.model";
import School from "../models/school.model";

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

  static async getParentDashboard(parentPhoneNo: string) {
    // Find all students linked to this parent phone number
    const students = await Student.find({ parentPhoneNo: Number(parentPhoneNo) });
    if (!students || students.length === 0) {
      return { success: false, message: "No students found for this phone number" };
    }

    // Get the bus info from the first student (typically all children share the same bus)
    const studentData = students.map((s) => ({
      _id: s._id,
      studentId: s.studentId,
      studentName: s.studentName,
      checkpoint: s.checkpoint,
      assignedBus: s.assignedBus,
    }));

    // Get bus details
    const busId = students[0].assignedBus?._id;
    let bus = null;
    let driverInfo = null;
    let routeInfo = null;

    if (busId) {
      bus = await Bus.findById(busId);

      if (bus?.assignedDriver?._id) {
        const driver = await Driver.findById(bus.assignedDriver._id);
        if (driver) {
          driverInfo = {
            _id: driver._id,
            driverName: driver.driverName,
            driverPhoneNo: driver.driverPhoneNo,
          };
        }
      }

      if (bus?.assignedRoute?._id) {
        const route = await BusRoute.findById(bus.assignedRoute._id);
        if (route) {
          routeInfo = {
            _id: route._id,
            routeName: route.routeName,
            locationsList: route.locationsList,
          };
        }
      }
    }

    // Get school info
    const school = await School.findOne();

    return {
      success: true,
      dashboard: {
        students: studentData,
        bus: bus
          ? {
              _id: bus._id,
              busNumber: bus.busNumber,
              busCapacity: bus.busCapacity,
            }
          : null,
        driver: driverInfo,
        route: routeInfo,
        school: school
          ? {
              schoolName: school.schoolName,
              contactPhone: school.contactPhone,
              contactEmail: school.contactEmail,
              address: school.address,
            }
          : null,
      },
    };
  }
}

