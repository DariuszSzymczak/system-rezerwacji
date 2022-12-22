import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { Reservation } from "./API";

export const getReservationsList = createAsyncThunk(
  "reservations/getAll",
  async () => {
    const data = await Api.getReservationsList();
    return data;
  }
);

const initialState = {
  reservations: [] as Reservation[],
  error: "",
  loading: false,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        getReservationsList.fulfilled,
        (state, action: { payload: Reservation[] }) => {
          state.reservations = action.payload;
          state.loading = false;
          state.error = "";
        }
      )
      .addCase(getReservationsList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationsList.rejected, (state, action) => {
        state.error = "błąd przy pobieraniu danych";
        state.loading = false;
      });
  },
  reducers: {},
});

const { reducer } = reservationsSlice;
export default reducer;
