import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "@/API/roomsSlice";
import photosReducer from "@/API/photosSlice";
import reservationsReducer from "@/API/reservationsSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    photos: photosReducer,
    reservations: reservationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
