import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { Room } from "./API";

export const getRoomsList = createAsyncThunk("rooms/getAll", async () => {
  const data = await Api.getRoomsList();
  return data;
});

const initialState = {
  rooms: [] as Room[],
  error: "",
  loading: false,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsList.fulfilled, (state, action: { payload: Room[] }) => {
        state.rooms = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getRoomsList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRoomsList.rejected, (state, action) => {
        state.error = "błąd przy pobieraniu danych";
        state.loading = false;
      });
  },
  reducers: {},
});

const { reducer } = roomsSlice;
export default reducer;
