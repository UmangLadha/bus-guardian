import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        process.env.FRONTEND_URL || "",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Driver joins their bus room for broadcasting location
    socket.on("join-bus-room", (busId: string) => {
      socket.join(`bus-${busId}`);
      console.log(`[Socket.io] ${socket.id} joined bus room: bus-${busId}`);
    });

    // Parent joins their phone room for receiving alerts
    socket.on("join-parent-room", (phoneNo: string) => {
      socket.join(`parent-${phoneNo}`);
      console.log(`[Socket.io] ${socket.id} joined parent room: parent-${phoneNo}`);
    });

    // Driver sends location update
    socket.on("driver-location-update", (data: { busId: string; lat: number; lng: number }) => {
      // Broadcast to all clients in the bus room (parents tracking this bus)
      io.to(`bus-${data.busId}`).emit("location-update", {
        lat: data.lat,
        lng: data.lng,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

/**
 * Get the Socket.io server instance.
 * Use this to emit events from controllers/services.
 */
export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initializeSocket first.");
  }
  return io;
}

/**
 * Emit a location update to all parents tracking a specific bus.
 */
export function emitLocationUpdate(busId: string, lat: number, lng: number) {
  if (io) {
    io.to(`bus-${busId}`).emit("location-update", { lat, lng, timestamp: new Date().toISOString() });
  }
}

/**
 * Emit a trip started event to all parents tracking a bus.
 */
export function emitTripStarted(busId: string) {
  if (io) {
    io.to(`bus-${busId}`).emit("trip-started", { busId, timestamp: new Date().toISOString() });
  }
}

/**
 * Emit a trip ended event to all parents tracking a bus.
 */
export function emitTripEnded(busId: string) {
  if (io) {
    io.to(`bus-${busId}`).emit("trip-ended", { busId, timestamp: new Date().toISOString() });
  }
}

/**
 * Emit a new alert to specific parent phone numbers.
 */
export function emitAlertToParents(parentPhones: string[], alert: any) {
  if (io) {
    for (const phone of parentPhones) {
      io.to(`parent-${phone}`).emit("new-alert", alert);
    }
  }
}
