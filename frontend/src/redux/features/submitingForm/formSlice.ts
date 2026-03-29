import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  isLoading: boolean;
}

const initialState: FormState = {
  isLoading: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setFormLoading } = formSlice.actions;
export default formSlice.reducer;
