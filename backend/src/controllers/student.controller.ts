import Student from "../models/student.model";
import { Request, Response } from "express";
import { generateIDFor } from "../utility/generateID";
import { getLocationCoordinates } from "../utility/locationCordinates";
import Bus from "../models/bus.model";

export class StudentsController {
  public static async addStudent(req: Request, res: Response) {
    try {
      const { studentName, parentContact, busNumber, pickupAddress } = req.body;
      if (!studentName || !parentContact || !busNumber || !pickupAddress) {
        res.status(400).json({ message: "All fileds are required" });
        return;
      }
      const busNo = await Bus.findOne({ busNumber });
      if (!busNo) {
        res.status(404).json({ message: "bus not found" });
        return;
      }
      const studentId = generateIDFor("Parent");
      const locationCoordinate = await getLocationCoordinates(pickupAddress);
      if (!locationCoordinate) {
        res.status(400).json({ message: "unable to find the location" });
        return;
      }
      const newStudent = await Student.create({
        studentId,
        studentName,
        parentContact,
        busAssigned: busNo._id,
        pickupAddress,
        pickupLocation: {
          type: "Point",
          coordinates: [locationCoordinate.lon, locationCoordinate.lat],
        },
      });
      res
        .status(201)
        .json({ message: "student registerd successfully", newStudent });
    } catch (error) {
      console.log("error in registering user", error);
      res.status(500).json({ message: "student registeration failed" });
    }
  }

  public static async loginStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.body;
      const existingStudent = await Student.findOne({ studentId });
      if (!existingStudent) {
        res.status(404).json({ message: "unable to find Student" });
        return;
      }
      res.status(200).json({ message: "Student login successfully" });
    } catch (error) {
      console.log("error in login Student", error);
      res.status(500).json({ message: "login failed" });
    }
  }

  public static async getStudents(req: Request, res: Response) {
    try {
      const students = await Student.find();
      res.status(200).json({ students });
    } catch (error) {
      console.log("error in fetching the students:", error);
      res.status(500).json({ message: "error in fetching the students" });
    }
  }

  public static async updateStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { studentName, parentContact, busNumber, pickupAddress } = req.body;
      const busNo = await Bus.findOne({ busNumber });
      if (!busNo) {
        res.status(404).json({ message: "bus not found" });
        return;
      }
      const locationCoordinate = await getLocationCoordinates(pickupAddress);
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
          studentName,
          parentContact,
          busAssigned: busNo._id,
          pickupAddress,
          pickupLocation: {
            type: "Point",
            coordinates: [locationCoordinate.lon, locationCoordinate.lat],
          },
        },
        { new: true }
      );
      if (!updatedStudent) {
        res.status(400).json({ message: "No student found!" });
        return;
      }
      res
        .status(200)
        .json({ message: "student Updated Succesfully", updatedStudent });
    } catch (error) {
      console.log("error in updating the students:", error);
      res.status(500).json({ message: "error in updating the students" });
    }
  }

  public static async deleteStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Student.findByIdAndDelete(id);
      res.status(200).json({
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the student:", error);
      res.status(500).json({ message: "error in deleting the student" });
    }
  }
}
