import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BusDataTypes } from "../../../types/types";

interface DriverState {
  buses: BusDataTypes[];
}

const initialState: DriverState = {
  buses: [],
};
export const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setbus: (state, action: PayloadAction<BusDataTypes[]>) => {
      state.buses = action.payload;
    },
  },
});

export const { setbus } = busSlice.actions;
export default busSlice.reducer;
