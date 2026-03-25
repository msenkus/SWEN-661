import { Calendar, Clock, MapPin, Video, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function AppointmentList() {
  const { isMobile } = useBreakpoint();
  
  const appointments = [
    {
      id: 1,
      title: 'Dr. Sarah Johnson',
      specialty: 'Primary Care Physician',
      date: 'Today',
      time: '2:00 PM',
      duration: '30 min',
      type: 'in-person',
      location: 'Main Street Medical Center',
      status: 'upcoming',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '45 min',
      type: 'video',
      location: 'Telehealth',
      status: 'upcoming',
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Physical Therapy',
      specialty: 'Dr. Emma Rodriguez',
      date: 'Jan 24',
      time: '3:00 PM',
      duration: '60 min',
      type: 'in-person',
      location: 'Rehabilitation Center',
      status: 'upcoming',
      color: 'bg-purple-500',
    },
    {
      id: 4,
      title: 'Lab Work',
      specialty: 'Blood Test & X-Ray',
      date: 'Jan 27',
      time: '8:30 AM',
      duration: '20 min',
      type: 'in-person',
      location: 'Medical Lab Services',
      status: 'upcoming',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 mb-2 text-sm md:text-base">Upcoming</p>
            <p className="text-4xl md:text-5xl font-bold">{appointments.length}</p>
            <p className="text-blue-100 mt-1 text-sm md:text-base">Appointments</p>
          </div>
          <Calendar className="w-12 h-12 md:w-16 md:h-16 text-blue-200" />
        </div>
      </div>

      {/* Appointment List */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Your Appointments</h2>
        <div className="space-y-3 md:space-y-4">
          {appointments.map((appointment) => (
            <Link
              key={appointment.id}
              to={`/app/appointments/${appointment.id}`}
              className="block bg-white rounded-xl md:rounded-2xl shadow-md border-2 border-gray-200 hover:border-blue-300 overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Color indicator */}
                  <div className={`w-3 md:w-4 h-16 md:h-20 ${appointment.color} rounded-full flex-shrink-0`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-base md:text-xl text-gray-900 mb-1">
                          {appointment.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">{appointment.specialty}</p>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hidden sm:block flex-shrink-0" />
                    </div>

                    <div className={`grid gap-2 md:gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm md:text-base font-semibold">{appointment.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm md:text-base">{appointment.time} ({appointment.duration})</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        {appointment.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm md:text-base">Video Call</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" />
                            <span className="text-sm md:text-base truncate">{appointment.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Add Appointment Button */}
      <div className="mt-6 md:mt-8">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-colors">
          Schedule New Appointment
        </button>
      </div>
    </div>
  );
}
