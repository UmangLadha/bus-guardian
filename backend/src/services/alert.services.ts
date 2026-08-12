import Alert from "../models/alert.model";

export class AlertServices {
  static async createAlert(
    type: "departed" | "arrived" | "nearby",
    busId: string,
    busNumber: string,
    message: string,
    targetParents: string[]
  ) {
    const alert = await Alert.create({
      type,
      busId,
      busNumber,
      message,
      targetParents,
    });

    return { success: true, alert };
  }

  static async getAlertsByParent(phoneNo: string) {
    const alerts = await Alert.find({
      targetParents: phoneNo,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return { success: true, alerts };
  }

  static async getRecentAlertsByParent(phoneNo: string) {
    // Get alerts from last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const alerts = await Alert.find({
      targetParents: phoneNo,
      createdAt: { $gte: since },
    })
      .sort({ createdAt: -1 });

    return { success: true, alerts };
  }

  static async markAsRead(alertId: string) {
    const alert = await Alert.findByIdAndUpdate(
      alertId,
      { read: true },
      { new: true }
    );

    if (!alert) {
      return { success: false, message: "Alert not found" };
    }

    return { success: true, alert };
  }
}
