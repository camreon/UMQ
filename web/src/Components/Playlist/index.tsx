import React, { useState } from 'react';
import { PlaylistProps } from '../../interfaces';
import './Playlist.css';
import ConfirmationDialog from '../Common/ConfirmationDialog';

const Playlist = ({ 
  playlistId,
  loading, 
  currentIndex, 
  tracks, 
  playTrack, 
  deleteTrack 
}: PlaylistProps) => {
  const [trackToDelete, setTrackToDelete] = useState<{ id: number; title: string } | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, track: { id: number; title: string }) => {
    e.stopPropagation();
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
          <div 
            key={track.id}
            onClick={() => playTrack(index)}
            className={`group relative px-6 py-4 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 track-item ${
              currentIndex === index ? 'playing' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {currentIndex === index ? (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 group-hover:bg-gray-200 transition-colors duration-200 track-number">
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate" title={track.title}>
                      {track.title}
                    </p>
                    {track.artist && (
                      <p className="text-sm text-gray-500 truncate" title={track.artist}>
                        {track.artist}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-4">
                    <a 
                      href={track.page_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200 action-button source-button"
                      title="Open source"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    <button
                      onClick={(e) => handleDeleteClick(e, track)}
                      className="text-gray-400 hover:text-red-600 transition-colors duration-200 action-button delete-button"
                      title={`Delete ${track.title}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
