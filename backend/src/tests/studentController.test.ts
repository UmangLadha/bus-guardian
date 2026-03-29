
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { StudentsController } from "../controllers/student.controller";
import { StudentServices } from "../services/student.services";
import studentRoutes from "../routes/student.routes";

// Mock the StudentServices
jest.mock("../services/student.services");

// Mock the verifyToken middleware
jest.mock("../middlewares/verifyToken", () => ({
  VerifyToken: (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

describe("Student Controller", () => {
  describe("GET /students", () => {
    it("should return a list of students", async () => {
      const mockStudents = [
        {
          _id: "1",
          studentId: "S1",
          studentName: "Student 1",
          parentPhoneNo: 1234567890,
        },
        {
          _id: "2",
          studentId: "S2",
          studentName: "Student 2",
          parentPhoneNo: 9876543210,
        },
      ];

      (StudentServices.getAllStudents as jest.Mock).mockResolvedValue({
        success: true,
        students: mockStudents,
      });
 
      const response = await request(app).get("/students");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ students: mockStudents });
    });

    it("should return a 500 error if there is an error fetching students", async () => {
      (StudentServices.getAllStudents as jest.Mock).mockRejectedValue(
        new Error("Error fetching students")
      );

      const response = await request(app).get("/students");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "error in fetching the students" });
    });
  });
});
