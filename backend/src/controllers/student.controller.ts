import { Request, Response } from "express";
import { StudentServices } from "../services/student.services";

export class StudentsController {
  static async addStudent(req: Request, res: Response) {
    try {
      const { studentName, parentContact, busNumber, pickupAddress } = req.body;
      if (!studentName || !parentContact || !busNumber || !pickupAddress) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const result = await StudentServices.registerStudent(
        studentName,
        parentContact,
        busNumber,
        pickupAddress
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(201).json({
        message: "student registerd successfully",
        student: result.newStudent,
      });
      return;
    } catch (error) {
      console.log("error in registering user", error);
      res.status(500).json({ message: "student registeration failed" });
      return;
    }
  }

  static async loginStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.body;
      const result = await StudentServices.loginStudent(studentId);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({
        message: "Student login successfully",
        student: result.existingStudent,
      });
      return;
    } catch (error) {
      console.log("error in login Student", error);
      res.status(500).json({ message: "login failed" });
      return;
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    try {
      const result = await StudentServices.getAllStudents();
      res.status(200).json({ students: result.students });
      return;
    } catch (error) {
      console.log("error in fetching the students:", error);
      res.status(500).json({ message: "error in fetching the students" });
      return;
    }
  }

  static async updateStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { studentName, parentContact, busNumber, pickupAddress } = req.body;
      const result = await StudentServices.updateStudentById(
        id,
        studentName,
        parentContact,
        busNumber,
        pickupAddress
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({
        message: "student Updated Succesfully",
        student: result.updatedStudent,
      });
      return;
    } catch (error) {
      console.log("error in updating the students:", error);
      res.status(500).json({ message: "error in updating the students" });
      return;
    }
  }

  static async deleteStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await StudentServices.deleteStudentById(id);
      res.status(200).json({
        message: "Student deleted successfully",
      });
      return;
    } catch (error) {
      console.log("error in deleting the student:", error);
      res.status(500).json({ message: "error in deleting the student" });
      return;
    }
  }
}
