import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getPlaylist, 
  getTrack, 
  addTrack, 
  deleteTrack, 
  getNextPlaylistId 
} from '../sources/api';

export const FETCH_PLAYLIST = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (playlistId: string) => {
    const response = await getPlaylist(playlistId);
    return response;
  }
);

export const FETCH_TRACK = createAsyncThunk(
  'playlist/fetchTrack',
  async ({ playlistId, trackId }: { playlistId: string; trackId: number }) => {
    const response = await getTrack(playlistId, trackId);
    return response;
  }
);

export const ADD_TRACK = createAsyncThunk(
  'playlist/addTrack',
  async ({ playlistId, pageUrl }: { playlistId: string; pageUrl: string }) => {
    const response = await addTrack(playlistId, pageUrl);
    return response;
  }
);

export const DELETE_TRACK = createAsyncThunk(
  'playlist/deleteTrack',
  async ({ playlistId, trackId }: { playlistId: string; trackId: number }) => {
    const response = await deleteTrack(playlistId, trackId);
    return { response, trackId };
  }
);

export const FETCH_NEXT_PLAYLIST_ID = createAsyncThunk(
  'playlist/fetchNextPlaylistId',
  async () => {
    const response = await getNextPlaylistId();
    return response;
  }
); 