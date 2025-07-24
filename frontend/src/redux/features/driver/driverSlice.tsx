import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DriverDataTypes } from "../../../types/types";

interface DriverState {
  driver: DriverDataTypes[];
}

const initialState: DriverState = {
  driver: [],
};
export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<DriverDataTypes[]>) => {
      state.driver = action.payload;
    },
  },
});

export const { setDrivers } = driverSlice.actions;
export default driverSlice.reducer;
