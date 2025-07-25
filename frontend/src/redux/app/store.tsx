import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/route/routeSlice";
import driverReducer from "../features/driver/driverSlice";
import busReducer from "../features/bus/busSlice";

export const store = configureStore({
  reducer: {
    Route: routeReducer,
    Driver: driverReducer,
    Bus: busReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
