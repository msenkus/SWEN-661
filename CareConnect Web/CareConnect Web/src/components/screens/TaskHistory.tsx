import { Calendar, CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function TaskHistory() {
  const { isMobile } = useBreakpoint();
  
  const weeklyStats = {
    totalTasks: 49,
    completed: 42,
    missed: 7,
    completionRate: 86,
  };

  const historyByDate = [
    {
      date: 'Today',
      fullDate: 'January 21, 2026',
      tasks: [
        { id: 1, title: 'Take Morning Medication', time: '8:00 AM', completed: true, type: 'medication' },
        { id: 2, title: 'Breakfast', time: '9:00 AM', completed: true, type: 'meal' },
        { id: 3, title: 'Physical Therapy Exercises', time: '10:30 AM', completed: false, type: 'exercise' },
      ],
    },
    {
      date: 'Yesterday',
      fullDate: 'January 20, 2026',
      tasks: [
        { id: 4, title: 'Take Morning Medication', time: '8:00 AM', completed: true, type: 'medication' },
        { id: 5, title: 'Breakfast', time: '9:00 AM', completed: true, type: 'meal' },
        { id: 6, title: 'Doctor Appointment', time: '2:00 PM', completed: true, type: 'appointment' },
        { id: 7, title: 'Take Evening Medication', time: '6:00 PM', completed: true, type: 'medication' },
        { id: 8, title: 'Dinner', time: '7:00 PM', completed: true, type: 'meal' },
      ],
    },
  ];

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'medication': return 'text-purple-700';
      case 'meal': return 'text-green-700';
      case 'exercise': return 'text-blue-700';
      case 'appointment': return 'text-orange-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Weekly Stats */}
      <div className={`grid gap-4 md:gap-6 mb-6 md:mb-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
          <p className="text-xs md:text-sm text-gray-500 mb-1">Total Tasks</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{weeklyStats.totalTasks}</p>
        </div>
        
        <div className="bg-green-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-green-200">
          <p className="text-xs md:text-sm text-green-600 mb-1">Completed</p>
          <p className="text-2xl md:text-3xl font-bold text-green-700">{weeklyStats.completed}</p>
        </div>
        
        <div className="bg-red-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-red-200">
          <p className="text-xs md:text-sm text-red-600 mb-1">Missed</p>
          <p className="text-2xl md:text-3xl font-bold text-red-700">{weeklyStats.missed}</p>
        </div>
        
        <div className="bg-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-blue-200">
          <p className="text-xs md:text-sm text-blue-600 mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> Rate
          </p>
          <p className="text-2xl md:text-3xl font-bold text-blue-700">{weeklyStats.completionRate}%</p>
        </div>
      </div>

      {/* History */}
      <div className="space-y-4 md:space-y-6">
        {historyByDate.map((day) => (
          <div key={day.date} className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-6 text-white">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold">{day.date}</h3>
                  <p className="text-xs md:text-sm text-blue-100">{day.fullDate}</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-3">
              {day.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg ${
                    task.completed ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm md:text-base font-semibold ${getTaskColor(task.type)}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-600">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{task.time}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                      task.completed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {task.completed ? 'Done' : 'Missed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
