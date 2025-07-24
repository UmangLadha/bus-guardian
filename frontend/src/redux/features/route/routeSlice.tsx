import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RouteDataTypes } from "../../../types/types";

interface RouteState {
  routes: RouteDataTypes[];
}

const initialState: RouteState = {
  routes: [],
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<RouteDataTypes[]>) => {
      state.routes = action.payload;
    },
  },
});

export const { setRoutes } = routeSlice.actions;

export default routeSlice.reducer;
