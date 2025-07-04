import { useState } from 'react';
import { PlaylistProps } from '../../interfaces';
import './Playlist.css';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import { Track } from './Track';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Playlist = ({ 
  playlistId,
  loading, 
  currentIndex, 
  tracks, 
  playTrack, 
  deleteTrack 
}: PlaylistProps) => {
  const { trackLoading } = useSelector((state: RootState) => state.playlist);
  const [trackToDelete, setTrackToDelete] = useState<{ id: number; title: string } | null>(null);

  const handleDeleteClick = (track: { id: number; title: string }) => {
    setTrackToDelete(track);
  };

  const handleConfirmDelete = () => {
    if (trackToDelete) {
      deleteTrack(trackToDelete.id);
      setTrackToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTrackToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 loading-spinner"></div>
          <p className="text-gray-600 font-medium">Loading tracks...</p>
        </div>
      </div>
    );
  }

  if (!tracks.length) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden empty-state glass-card">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Playlist {playlistId}</h2>
        </div>

        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tracks found</h3>
          <p className="text-gray-600 mb-6">Get started by adding a track above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden playlist-container glass-card">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Playlist {playlistId}</h2>
        <p className="text-sm text-gray-600">{tracks.length} track{tracks.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {tracks.map((track, index) => (
          <Track
            key={track.id}
            isLoading={trackLoading}
            isPlaying={currentIndex === index}
            handleOnClick={() => playTrack(index)}
            handleOnDelete={() => handleDeleteClick(track)}
            track={track}
            index={index}
          />
        ))}
      </div>
      
      {trackToDelete && (
        <ConfirmationDialog
          title="Delete Track"
          message={`Are you sure you want to delete "${trackToDelete.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Playlist;
