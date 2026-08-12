import LocationChangeRequest from "../models/locationChangeRequest.model";
import Student from "../models/student.model";

export class LocationChangeRequestServices {
  static async createRequest(
    studentId: string,
    parentPhoneNo: string,
    requestedCheckpoint: string,
    reason?: string
  ) {
    const student = await Student.findById(studentId);
    if (!student) {
      return { success: false, message: "Student not found" };
    }

    // Verify the parent phone matches
    if (String(student.parentPhoneNo) !== parentPhoneNo) {
      return { success: false, message: "Unauthorized: Phone number does not match student record" };
    }

    const request = await LocationChangeRequest.create({
      studentId,
      parentPhoneNo,
      currentCheckpoint: student.checkpoint || "Not set",
      requestedCheckpoint,
      reason,
      status: "pending",
    });

    return { success: true, request };
  }

  static async getRequestsByParent(phoneNo: string) {
    const requests = await LocationChangeRequest.find({ parentPhoneNo: phoneNo })
      .populate("studentId", "studentName studentId checkpoint")
      .sort({ createdAt: -1 });

    return { success: true, requests };
  }

  static async getAllPendingRequests() {
    const requests = await LocationChangeRequest.find({ status: "pending" })
      .populate("studentId", "studentName studentId checkpoint assignedBus")
      .sort({ createdAt: -1 });

    return { success: true, requests };
  }

  static async getAllRequests() {
    const requests = await LocationChangeRequest.find()
      .populate("studentId", "studentName studentId checkpoint assignedBus")
      .sort({ createdAt: -1 });

    return { success: true, requests };
  }

  static async respondToRequest(requestId: string, status: "approved" | "rejected") {
    const request = await LocationChangeRequest.findById(requestId);
    if (!request) {
      return { success: false, message: "Request not found" };
    }

    request.status = status;
    request.respondedAt = new Date();
    await request.save();

    // If approved, update the student's checkpoint
    if (status === "approved") {
      await Student.findByIdAndUpdate(request.studentId, {
        checkpoint: request.requestedCheckpoint,
      });
    }

    return { success: true, request };
  }
}
