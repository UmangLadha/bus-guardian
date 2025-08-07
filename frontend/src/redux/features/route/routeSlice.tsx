import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateRouteDto, RouteApiResponse } from "../../../types/types";

interface RouteState {
  routes: CreateRouteDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RouteState = {
  routes: [],
  isLoading: false,
  error: null,
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<RouteApiResponse>) => {
      state.routes = action.payload.Routes;
    },
  },
});

export const { setRoutes } = routeSlice.actions;

export default routeSlice.reducer;
