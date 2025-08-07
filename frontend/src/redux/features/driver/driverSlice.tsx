import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateDriverDto, DriverApiResponse } from "../../../types/types";

interface DriverState {
  driver: CreateDriverDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  driver: [],
  isLoading: false,
  error: null,
};
export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<DriverApiResponse>) => {
      state.driver = action.payload.drivers;
    },
  },
});

export const { setDrivers } = driverSlice.actions;
export default driverSlice.reducer;
