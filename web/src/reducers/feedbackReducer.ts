import { createSlice } from '@reduxjs/toolkit';
import { 
  FETCH_PLAYLIST, 
  FETCH_TRACK, 
  ADD_TRACK, 
  DELETE_TRACK, 
  FETCH_NEXT_PLAYLIST_ID 
} from '../actions/playlistActions';

interface FeedbackState {
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  loading: false,
  error: null
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Pending actions
      .addCase(FETCH_PLAYLIST.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_TRACK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ADD_TRACK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DELETE_TRACK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_NEXT_PLAYLIST_ID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Rejected actions
      .addCase(FETCH_PLAYLIST.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch playlist';
      })
      .addCase(FETCH_TRACK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch track';
      })
      .addCase(ADD_TRACK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add track';
      })
      .addCase(DELETE_TRACK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete track';
      })
      .addCase(FETCH_NEXT_PLAYLIST_ID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch next playlist ID';
      });
  }
});

export const { clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer; 