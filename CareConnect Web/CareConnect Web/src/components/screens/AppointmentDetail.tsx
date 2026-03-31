import { Calendar, Clock, MapPin, Video, Phone, Mail, ArrowLeft, Bell } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function AppointmentDetail() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { isMobile } = useBreakpoint();

  // Mock appointment data
  const appointment = {
    id: appointmentId,
    title: 'Dr. Sarah Johnson',
    specialty: 'Primary Care Physician',
    date: 'Today',
    fullDate: 'January 21, 2026',
    time: '2:00 PM',
    duration: '30 min',
    type: 'in-person',
    location: {
      name: 'Main Street Medical Center',
      address: '456 Main Street, Suite 200',
      city: 'Springfield, IL 62701',
    },
    phone: '(555) 123-4567',
    email: 'appointments@mainstreetmedical.com',
    notes: 'Annual checkup. Please bring your medication list and insurance card.',
    preparation: [
      'Bring current medication list',
      'Bring insurance card and ID',
      'Arrive 15 minutes early',
      'Fasting not required',
    ],
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/app/appointments')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Back to Appointments</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {appointment.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600">{appointment.specialty}</p>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl flex items-center gap-2 self-start">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Add Reminder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          {/* Date & Time Card */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Appointment Details</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-bold text-base md:text-lg text-gray-900">{appointment.date}</p>
                  <p className="text-xs md:text-sm text-gray-600">{appointment.fullDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Time</p>
                  <p className="font-bold text-base md:text-lg text-gray-900">{appointment.time}</p>
                  <p className="text-xs md:text-sm text-gray-600">{appointment.duration} duration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Location</h2>
            
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base md:text-lg text-gray-900 mb-1">
                  {appointment.location.name}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {appointment.location.address}<br />
                  {appointment.location.city}
                </p>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base">
              Get Directions
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="space-y-3">
              <a
                href={`tel:${appointment.phone}`}
                className="flex items-center gap-3 p-3 md:p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base text-gray-900">{appointment.phone}</span>
              </a>

              <a
                href={`mailto:${appointment.email}`}
                className="flex items-center gap-3 p-3 md:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base text-gray-900 truncate">{appointment.email}</span>
              </a>
            </div>
          </div>

          {/* Preparation */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-4">Preparation Checklist</h2>
            
            <ul className="space-y-2 md:space-y-3">
              {appointment.preparation.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-blue-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-yellow-900 mb-2">Notes</h2>
              <p className="text-sm md:text-base text-yellow-800">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
