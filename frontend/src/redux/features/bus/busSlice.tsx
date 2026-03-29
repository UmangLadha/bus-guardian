import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BusApiResponse, CreateBusDto } from '../../../types/types';

interface BusState {
  buses: CreateBusDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BusState = {
  buses: [],
  isLoading: false,
  error: null,
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setbus: (state, action: PayloadAction<BusApiResponse>) => {
      state.buses = action.payload.buses;
    },
  },
});

export const { setbus } = busSlice.actions;
export default busSlice.reducer;
