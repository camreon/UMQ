import React from 'react';
import { TrackComponentProps } from '../../../interfaces';
import './Track.css';

export const Track: React.FC<TrackComponentProps> = ({
  isLoading,
  isPlaying,
  handleOnClick,
  handleOnDelete,
  title,
  artist,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      handleOnDelete();
    }
  };

  const trackClass = [
    "flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200",
    isPlaying ? "bg-primary-50 border-l-4 border-primary-500" : "hover:bg-gray-50",
    isLoading ? "opacity-50 pointer-events-none" : ""
  ].join(' ');

  return (
    <div className={trackClass} onClick={handleOnClick}>
      <div className="flex-1 min-w-0 mr-4">
        <div className="text-sm font-medium text-gray-900 truncate" title={title}>
          {title}
        </div>
        {artist && (
          <div className="text-sm text-gray-500 truncate" title={artist}>
            {artist}
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded"
          title={`Delete ${title}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
