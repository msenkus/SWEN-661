import { Pill, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function MedicationList() {
  const { isMobile } = useBreakpoint();
  
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril 10mg',
      dosage: '1 tablet',
      time: '8:00 AM',
      taken: true,
      notes: 'Take with food',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Metformin 500mg',
      dosage: '2 tablets',
      time: '8:00 AM',
      taken: true,
      notes: 'Take with breakfast',
      color: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Atorvastatin 20mg',
      dosage: '1 tablet',
      time: '6:00 PM',
      taken: false,
      notes: 'Take with dinner',
      color: 'bg-purple-500',
    },
    {
      id: 4,
      name: 'Aspirin 81mg',
      dosage: '1 tablet',
      time: '8:00 AM',
      taken: true,
      notes: 'Blood thinner',
      color: 'bg-red-500',
    },
    {
      id: 5,
      name: 'Vitamin D3 1000 IU',
      dosage: '1 capsule',
      time: '8:00 AM',
      taken: true,
      notes: 'Daily supplement',
      color: 'bg-yellow-500',
    },
  ]);

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const takenCount = medications.filter(m => m.taken).length;
  const totalCount = medications.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header Stats */}
      <div className={`grid gap-4 md:gap-6 mb-6 md:mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 mb-2 text-sm md:text-base">Medications Today</p>
              <p className="text-4xl md:text-5xl font-bold">{takenCount}/{totalCount}</p>
            </div>
            <Pill className="w-12 h-12 md:w-16 md:h-16 text-purple-200" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
          <h3 className="text-gray-500 text-sm mb-4">Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-gray-600">Taken</span>
              <span className="text-lg md:text-xl font-bold text-green-600">{takenCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-gray-600">Remaining</span>
              <span className="text-lg md:text-xl font-bold text-orange-600">{totalCount - takenCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medication List */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Your Medications</h2>
        <div className="space-y-3 md:space-y-4">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className={`bg-white rounded-xl md:rounded-2xl shadow-md border-2 overflow-hidden transition-all ${
                medication.taken ? 'border-green-200 bg-green-50/50' : 'border-gray-200'
              }`}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Color indicator */}
                  <div className={`w-3 md:w-4 h-12 md:h-16 ${medication.color} rounded-full flex-shrink-0`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h3 className={`font-bold text-base md:text-xl mb-1 ${
                          medication.taken ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {medication.name}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">{medication.dosage}</p>
                      </div>
                      
                      <button
                        onClick={() => toggleMedication(medication.id)}
                        className="flex-shrink-0"
                      >
                        {medication.taken ? (
                          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                        ) : (
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-gray-300 hover:border-green-500 transition-colors" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 md:w-5 md:h-5" />
                        <span>{medication.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm">{medication.notes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="mt-6 md:mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-4 md:p-6">
        <div className="flex gap-3 md:gap-4">
          <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-base md:text-lg text-yellow-900 mb-1">Important Reminder</h3>
            <p className="text-sm md:text-base text-yellow-800">
              Always consult with your doctor before making any changes to your medication schedule. 
              If you experience any unusual side effects, contact your healthcare provider immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
