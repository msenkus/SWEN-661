import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useTaskStore } from '../../store/taskStore';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function TodayDashboard() {
  const { isMobile, isTablet } = useBreakpoint();
  const tasks = useTaskStore((state) => state.tasks);
  const completeTask = useTaskStore((state) => state.completeTask);
  const hasMissedTasks = useTaskStore((state) => state.hasMissedTasks);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-purple-100 text-purple-700';
      case 'meal': return 'bg-green-100 text-green-700';
      case 'exercise': return 'bg-blue-100 text-blue-700';
      case 'appointment': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Mobile/Tablet: Single column, Desktop: 3 columns */}
      <div className={`grid gap-4 md:gap-6 mb-6 md:mb-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {/* Progress Card */}
        <div className={`${isMobile ? 'col-span-1' : isTablet ? 'col-span-2' : 'col-span-2'} bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 mb-2 text-sm md:text-base">Today's Progress</p>
              <p className="text-4xl md:text-5xl font-bold">
                {completedCount}/{totalCount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl md:text-4xl font-bold">{Math.round(progressPercentage)}%</p>
              <p className="text-blue-100 text-sm md:text-base">Complete</p>
            </div>
          </div>
          <div className="w-full bg-blue-400/30 rounded-full h-3 md:h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-200">
          <h3 className="text-gray-500 text-sm mb-4">Quick Stats</h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{tasks.filter(t => !t.completed).length}</p>
              <p className="text-sm text-gray-600">Tasks Remaining</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-green-600">{completedCount}</p>
              <p className="text-sm text-gray-600">Completed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Show here on mobile/tablet */}
      {(isMobile || isTablet) && (
        <div className={`mb-6 md:mb-8 grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Link
            to="/app/medications"
            className="block bg-purple-500 hover:bg-purple-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
          >
            <h3 className="font-bold text-base md:text-lg mb-1">Medications</h3>
            <p className="text-purple-100 text-xs md:text-sm">View all medications</p>
          </Link>

          <Link
            to="/app/appointments"
            className="block bg-orange-500 hover:bg-orange-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
          >
            <h3 className="font-bold text-base md:text-lg mb-1">Appointments</h3>
            <p className="text-orange-100 text-xs md:text-sm">Upcoming appointments</p>
          </Link>

          <Link
            to="/app/asl-help"
            className="block bg-green-500 hover:bg-green-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
          >
            <h3 className="font-bold text-base md:text-lg mb-1">ASL Help</h3>
            <p className="text-green-100 text-xs md:text-sm">Video guidance</p>
          </Link>

          <Link
            to="/app/history"
            className="block bg-gray-700 hover:bg-gray-800 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
          >
            <h3 className="font-bold text-base md:text-lg mb-1">Task History</h3>
            <p className="text-gray-300 text-xs md:text-sm">View past tasks</p>
          </Link>
        </div>
      )}

      {/* Main Content Grid - Mobile: single column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {/* Task List */}
        <div className={`${isMobile ? 'col-span-1' : isTablet ? 'col-span-1' : 'col-span-2'} space-y-3 md:space-y-4`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Today's Tasks</h2>
            {hasMissedTasks && (
              <Link
                to="/app/missed-tasks"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm md:text-base"
              >
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>2 Missed</span>
              </Link>
            )}
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl md:rounded-2xl shadow-md border-2 overflow-hidden transition-all ${
                task.current ? 'border-blue-300 shadow-lg' : 'border-gray-200'
              }`}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <button
                    onClick={() => completeTask(task.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-300 hover:text-blue-500 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3
                        className={`font-bold text-base md:text-xl ${
                          task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                        <Clock className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-semibold text-sm md:text-base">{task.time}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getTaskColor(task.type)}`}>
                        {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                      </span>

                      {task.current && !task.completed && (
                        <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-blue-500 text-white">
                          Current Task
                        </span>
                      )}
                    </div>

                    {task.current && !task.completed && (
                      <div className="mt-3 md:mt-4">
                        <Link
                          to="/app/task/physical-therapy"
                          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-colors text-sm md:text-base"
                        >
                          Start Task
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions - Desktop only (hidden on mobile/tablet) */}
        {!isMobile && !isTablet && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>

            <Link
              to="/app/medications"
              className="block bg-purple-500 hover:bg-purple-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
            >
              <h3 className="font-bold text-base md:text-lg mb-1">Medications</h3>
              <p className="text-purple-100 text-xs md:text-sm">View all medications</p>
            </Link>

            <Link
              to="/app/appointments"
              className="block bg-orange-500 hover:bg-orange-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
            >
              <h3 className="font-bold text-base md:text-lg mb-1">Appointments</h3>
              <p className="text-orange-100 text-xs md:text-sm">Upcoming appointments</p>
            </Link>

            <Link
              to="/app/asl-help"
              className="block bg-green-500 hover:bg-green-600 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
            >
              <h3 className="font-bold text-base md:text-lg mb-1">ASL Help</h3>
              <p className="text-green-100 text-xs md:text-sm">Video guidance</p>
            </Link>

            <Link
              to="/app/history"
              className="block bg-gray-700 hover:bg-gray-800 text-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-colors"
            >
              <h3 className="font-bold text-base md:text-lg mb-1">Task History</h3>
              <p className="text-gray-300 text-xs md:text-sm">View past tasks</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}