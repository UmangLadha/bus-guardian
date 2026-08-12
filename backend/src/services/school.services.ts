import School from "../models/school.model";

export class SchoolServices {
  static async getSchoolInfo() {
    const school = await School.findOne();
    if (!school) {
      return { success: false, message: "School info not configured" };
    }
    return { success: true, school };
  }

  static async upsertSchoolInfo(
    schoolName: string,
    contactPhone: string,
    contactEmail?: string,
    address?: string
  ) {
    // Upsert — update if exists, create if not
    const school = await School.findOneAndUpdate(
      {},
      { schoolName, contactPhone, contactEmail, address },
      { new: true, upsert: true }
    );

    return { success: true, school };
  }
}
