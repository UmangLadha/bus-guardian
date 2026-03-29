import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/route/routeSlice";
import driverReducer from "../features/driver/driverSlice";
import busReducer from "../features/bus/busSlice";
import formReducer from "../features/submitingForm/formSlice";

export const store = configureStore({
  reducer: {
    Route: routeReducer,
    Driver: driverReducer,
    Bus: busReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
