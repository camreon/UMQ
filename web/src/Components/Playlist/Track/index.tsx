import React from 'react';
import { TrackComponentProps } from '../../../interfaces';
import './Track.css';

export const Track: React.FC<TrackComponentProps> = ({
  isLoading,
  isPlaying,
  handleOnClick,
  handleOnDelete,
  track,
  index
}) => {
  return (
    <div 
      onClick={handleOnClick}
      className={`group relative px-6 py-4 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 track-item 
        ${isPlaying ? 'playing' : ''}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {isPlaying ? (
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnDelete();
                }}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200 action-button delete-button cursor-pointer"
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
  );
};
