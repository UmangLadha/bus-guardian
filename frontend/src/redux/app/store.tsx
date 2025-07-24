import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/route/routeSlice";
import driverReducer from "../features/driver/driverSlice";

export const store = configureStore({
  reducer: {
    Route: routeReducer,
    Driver: driverReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
