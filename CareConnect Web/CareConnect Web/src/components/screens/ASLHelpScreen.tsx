import { Video, Play, Book, HelpCircle } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function ASLHelpScreen() {
  const { isMobile } = useBreakpoint();
  
  const videoCategories = [
    {
      id: 1,
      title: 'Medication Instructions',
      videos: [
        { id: 1, title: 'How to Take Pills', duration: '2:30' },
        { id: 2, title: 'Using an Inhaler', duration: '3:15' },
        { id: 3, title: 'Insulin Injection Guide', duration: '4:00' },
      ],
      color: 'bg-purple-500',
    },
    {
      id: 2,
      title: 'Exercise Routines',
      videos: [
        { id: 4, title: 'Chair Exercises', duration: '5:00' },
        { id: 5, title: 'Stretching Basics', duration: '3:45' },
        { id: 6, title: 'Balance Training', duration: '4:30' },
      ],
      color: 'bg-blue-500',
    },
    {
      id: 3,
      title: 'Emergency Procedures',
      videos: [
        { id: 7, title: 'Calling for Help', duration: '2:00' },
        { id: 8, title: 'Fall Recovery', duration: '3:30' },
      ],
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center">
            <Video className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">ASL Video Library</h1>
            <p className="text-green-100 text-sm md:text-base">American Sign Language guidance and tutorials</p>
          </div>
        </div>
      </div>

      {/* Video Categories */}
      <div className="space-y-6 md:space-y-8">
        {videoCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`${category.color} p-4 md:p-6 text-white`}>
              <h2 className="text-lg md:text-xl font-bold">{category.title}</h2>
            </div>

            <div className={`grid gap-3 md:gap-4 p-4 md:p-6 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {category.videos.map((video) => (
                <button
                  key={video.id}
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all text-left"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 truncate">
                      {video.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">{video.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-6 md:mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6">
        <div className="flex gap-3 md:gap-4">
          <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-base md:text-lg text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm md:text-base text-blue-800">
              If you need assistance understanding any of these videos, please contact your care coordinator 
              or use the Emergency SOS feature for immediate help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
