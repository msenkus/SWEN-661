import { Phone, User, MapPin, Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { useState } from 'react';

export function SOSConfirmation() {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [calling, setCalling] = useState(false);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Mary Johnson',
      relation: 'Daughter',
      phone: '(555) 234-5678',
      primary: true,
    },
    {
      id: 2,
      name: '911',
      relation: 'Emergency Services',
      phone: '911',
      emergency: true,
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      relation: 'Primary Care',
      phone: '(555) 123-4567',
      primary: false,
    },
  ];

  const handleCall = (phone: string, name: string) => {
    setCalling(true);
    setTimeout(() => {
      alert(`Calling ${name} at ${phone}...`);
      setCalling(false);
    }, 1000);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 bg-red-50">
      <div className="max-w-3xl w-full">
        {/* SOS Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-400">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 md:p-8 text-white text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Phone className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Emergency SOS</h1>
            <p className="text-red-100 text-sm md:text-base">
              Select a contact to call for immediate assistance
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Emergency Contacts */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {emergencyContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleCall(contact.phone, contact.name)}
                  disabled={calling}
                  className={`w-full text-left rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all hover:shadow-lg disabled:opacity-50 ${
                    contact.emergency
                      ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
                      : contact.primary
                      ? 'bg-blue-50 border-blue-300 hover:border-blue-400'
                      : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                        contact.emergency
                          ? 'bg-white/20'
                          : contact.primary
                          ? 'bg-blue-100'
                          : 'bg-gray-200'
                      }`}
                    >
                      {contact.emergency ? (
                        <Phone className={`w-6 h-6 md:w-8 md:h-8 ${contact.emergency ? 'text-white' : 'text-blue-600'}`} />
                      ) : (
                        <User className={`w-6 h-6 md:w-8 md:h-8 ${contact.primary ? 'text-blue-600' : 'text-gray-600'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-lg md:text-xl mb-1 ${
                          contact.emergency ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {contact.name}
                      </h3>
                      <p
                        className={`text-sm md:text-base ${
                          contact.emergency ? 'text-red-100' : 'text-gray-600'
                        }`}
                      >
                        {contact.relation} • {contact.phone}
                      </p>
                    </div>
                    <Phone
                      className={`w-6 h-6 md:w-7 md:h-7 flex-shrink-0 ${
                        contact.emergency ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Medical Info Alert */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex gap-3 md:gap-4">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base md:text-lg text-yellow-900 mb-1">
                    Medical Information
                  </h3>
                  <ul className="text-sm md:text-base text-yellow-800 space-y-1">
                    <li>• Blood Type: O+</li>
                    <li>• Allergies: Penicillin, Sulfa drugs</li>
                    <li>• Conditions: Type 2 Diabetes, Hypertension</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex gap-3 md:gap-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base md:text-lg text-blue-900 mb-1">
                    Current Location
                  </h3>
                  <p className="text-sm md:text-base text-blue-800">
                    123 Main Street, Apartment 4B<br />
                    Springfield, IL 62701
                  </p>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => navigate('/app/dashboard')}
              className="w-full px-6 py-3 md:py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel & Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
