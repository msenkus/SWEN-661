import { AlertTriangle, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTaskStore } from '../../store/taskStore';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function MissedTaskAlert() {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const dismissMissedTasks = useTaskStore((state) => state.dismissMissedTasks);

  const missedTasks = [
    {
      id: 1,
      time: '9:30 AM',
      title: 'Morning Walk',
      missedBy: '45 minutes',
    },
    {
      id: 2,
      time: '11:00 AM',
      title: 'Water Intake Reminder',
      missedBy: '15 minutes',
    },
  ];

  const handleDismiss = () => {
    dismissMissedTasks();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 bg-red-50">
      <div className="max-w-2xl w-full">
        {/* Alert Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-300">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 md:p-8 text-white text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Missed Tasks Alert</h1>
            <p className="text-red-100 text-sm md:text-base">
              You have {missedTasks.length} tasks that need your attention
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {missedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-red-50 border-2 border-red-200 rounded-xl md:rounded-2xl p-4 md:p-6"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base md:text-xl text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        Scheduled: {task.time}
                      </p>
                      <p className="text-sm md:text-base text-red-600 font-semibold mt-1">
                        Missed by: {task.missedBy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex gap-3 md:gap-4 ${isMobile ? 'flex-col-reverse' : ''}`}>
              <button
                onClick={handleDismiss}
                className={`${
                  isMobile ? 'w-full' : 'flex-1'
                } px-6 py-3 md:py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2`}
              >
                <X className="w-5 h-5" />
                Dismiss
              </button>

              <button
                onClick={() => navigate('/app/dashboard')}
                className={`${
                  isMobile ? 'w-full' : 'flex-1'
                } px-6 py-3 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-colors`}
              >
                View Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-4 md:mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-4 md:p-6">
          <p className="text-sm md:text-base text-yellow-900 text-center">
            <strong>Reminder:</strong> It's important to complete your daily tasks on schedule. 
            If you need help, please contact your care coordinator.
          </p>
        </div>
      </div>
    </div>
  );
}
