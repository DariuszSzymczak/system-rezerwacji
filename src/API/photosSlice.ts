import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { Photo } from "./API";

export const getPhotosList = createAsyncThunk("photos/getAll", async () => {
  const data = await Api.getPhotosList();
  return data;
});

const initialState = {
  photos: [] as Photo[],
  error: "",
  loading: false,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        getPhotosList.fulfilled,
        (state, action: { payload: Photo[] }) => {
          state.photos = action.payload;
          state.loading = false;
          state.error = "";
        }
      )
      .addCase(getPhotosList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPhotosList.rejected, (state, action) => {
        state.error = "błąd przy pobieraniu danych";
        state.loading = false;
      });
  },
  reducers: {},
});

const { reducer } = photosSlice;
export default reducer;
