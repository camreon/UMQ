import { PlayerProps } from '../../interfaces';
import './Player.css';

const Player = ({ 
  streamUrl, 
  handleOnNext, 
  handleOnPrev, 
  title = '', 
  artist = '' 
}: PlayerProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 shadow-lg fixed bottom-0 left-0 right-0 z-50 player-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleOnPrev}
              title="Play Previous"
              className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <audio 
              autoPlay 
              controls 
              controlsList="nodownload"
              src={streamUrl}
              onEnded={handleOnNext}
              className="flex-1 flex-center px-6"
            />
            
            {/* {title && (
              <div className="flex-1 text-center px-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <p className="text-sm font-semibold text-gray-900 truncate mb-1">{title}</p>
                  {artist && (
                    <p className="text-xs text-gray-600 truncate">{artist}</p>
                  )}
                </div>
              </div>
            )} */}
            
            <button 
              onClick={handleOnNext}
              title="Play Next"
              className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
