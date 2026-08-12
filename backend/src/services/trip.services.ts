import Trip from "../models/trip.model";
import Bus from "../models/bus.model";
import Student from "../models/student.model";
import Alert from "../models/alert.model";
import BusRoute from "../models/route.model";
import { emitLocationUpdate, emitTripStarted, emitTripEnded, emitAlertToParents } from "../utility/socket";

export class TripServices {
  static async startTrip(driverId: string, busId: string, routeId: string) {
    // Check for existing active trip
    const activeTrip = await Trip.findOne({ busId, status: "started" });
    if (activeTrip) {
      return { success: false, message: "An active trip already exists for this bus" };
    }

    const trip = await Trip.create({
      busId,
      driverId,
      routeId,
      status: "started",
      startedAt: new Date(),
    });

    // Create a "departed" alert for all parents on this bus
    const students = await Student.find({ "assignedBus._id": busId });
    const parentPhones = students.map((s) => String(s.parentPhoneNo));
    const bus = await Bus.findById(busId);

    if (parentPhones.length > 0) {
      const alert = await Alert.create({
        type: "departed",
        busId,
        busNumber: bus?.busNumber || "",
        message: `Bus ${bus?.busNumber || ""} has departed from school`,
        targetParents: parentPhones,
      });

      // Emit real-time alert to parents via Socket.io
      emitAlertToParents(parentPhones, alert);
    }

    // Notify parents that trip has started
    emitTripStarted(busId);

    return { success: true, trip };
  }

  static async updateLocation(tripId: string, lat: number, lng: number) {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return { success: false, message: "Trip not found" };
    }
    if (trip.status !== "started") {
      return { success: false, message: "Trip is not active" };
    }

    trip.liveLocation = { lat, lng, updatedAt: new Date() };
    await trip.save();

    // Emit real-time location update via Socket.io
    emitLocationUpdate(trip.busId.toString(), lat, lng);

    // Check proximity to student checkpoints for "nearby" alerts
    await TripServices.checkNearbyAlerts(trip.busId.toString(), lat, lng);

    return { success: true, trip };
  }

  static async completeTrip(tripId: string) {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return { success: false, message: "Trip not found" };
    }

    trip.status = "completed";
    trip.completedAt = new Date();
    await trip.save();

    // Create "arrived" alert
    const students = await Student.find({ "assignedBus._id": trip.busId });
    const parentPhones = students.map((s) => String(s.parentPhoneNo));
    const bus = await Bus.findById(trip.busId);

    if (parentPhones.length > 0) {
      const alert = await Alert.create({
        type: "arrived",
        busId: trip.busId,
        busNumber: bus?.busNumber || "",
        message: `Bus ${bus?.busNumber || ""} has arrived at destination`,
        targetParents: parentPhones,
      });

      // Emit real-time alert to parents
      emitAlertToParents(parentPhones, alert);
    }

    // Notify parents that trip has ended
    emitTripEnded(trip.busId.toString());

    return { success: true, trip };
  }

  static async getActiveTrip(busId: string) {
    const trip = await Trip.findOne({ busId, status: "started" })
      .populate("busId")
      .populate("driverId")
      .populate("routeId");

    if (!trip) {
      return { success: false, message: "No active trip found for this bus" };
    }

    return { success: true, trip };
  }

  static async checkNearbyAlerts(busId: string, busLat: number, busLng: number) {
    try {
      // Get the bus route to find stop coordinates
      const bus = await Bus.findById(busId);
      if (!bus || !bus.assignedRoute?._id) return;

      const route = await BusRoute.findById(bus.assignedRoute._id);
      if (!route) return;

      const students = await Student.find({ "assignedBus._id": busId });

      for (const location of route.locationsList) {
        // Calculate distance (simple Haversine approximation)
        const distance = TripServices.calculateDistance(
          busLat, busLng,
          location.latitude, location.longitude
        );

        // If bus is within 500m of a stop
        if (distance <= 0.5) {
          // Find students assigned to this checkpoint
          const nearbyStudents = students.filter(
            (s) => s.checkpoint === location.locationName
          );
          const parentPhones = nearbyStudents.map((s) => String(s.parentPhoneNo));

          if (parentPhones.length > 0) {
            // Check if we already sent a nearby alert for this stop recently (last 10 min)
            const recentAlert = await Alert.findOne({
              type: "nearby",
              busId,
              message: { $regex: location.locationName },
              createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
            });

            if (!recentAlert) {
              const alert = await Alert.create({
                type: "nearby",
                busId,
                busNumber: bus.busNumber,
                message: `Bus ${bus.busNumber} is approaching ${location.locationName}`,
                targetParents: parentPhones,
              });

              // Emit real-time nearby alert to parents
              emitAlertToParents(parentPhones, alert);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error checking nearby alerts:", error);
    }
  }

  // Simple Haversine distance in km
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
