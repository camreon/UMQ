import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from '../reducers/playlistReducer';
import feedbackReducer from '../reducers/feedbackReducer';

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 