import { useState } from 'react';
import { ChevronRight, CheckCircle2, ArrowLeft, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function StepByStepTask() {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      title: 'Preparation',
      instruction: 'Find a quiet space with room to move. Make sure you have your exercise mat ready.',
      image: '🧘‍♀️',
    },
    {
      title: 'Neck Rotation',
      instruction: 'Gently turn your head to the right, hold for 5 seconds, then turn to the left.',
      image: '🔄',
    },
    {
      title: 'Shoulder Rolls',
      instruction: 'Roll your shoulders backward 10 times, then forward 10 times. Move slowly and breathe.',
      image: '💪',
    },
    {
      title: 'Arm Raises',
      instruction: 'Raise both arms straight up above your head. Hold for 3 seconds, then lower slowly.',
      image: '🙌',
    },
    {
      title: 'Leg Lifts',
      instruction: 'While seated, lift your right leg straight out. Hold for 5 seconds, then switch legs.',
      image: '🦵',
    },
    {
      title: 'Cool Down',
      instruction: 'Take 5 deep breaths, breathing in through your nose and out through your mouth.',
      image: '😌',
    },
  ];

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Task completed
      navigate('/app/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Back button - mobile */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate('/app/dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-blue-50 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm md:text-base font-semibold text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm md:text-base font-semibold text-blue-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Step Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden mb-6 md:mb-8">
            {/* Emoji Illustration */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 md:p-12 flex items-center justify-center">
              <div className="text-8xl md:text-9xl">{step.image}</div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-base md:text-lg">{currentStep + 1}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex-1">{step.title}</h2>
              </div>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {step.instruction}
              </p>
            </div>
          </div>

          {/* Step Progress Indicators */}
          <div className={`grid gap-2 md:gap-3 mb-6 md:mb-8 ${
            isMobile ? 'grid-cols-3' : 'grid-cols-6'
          }`}>
            {steps.map((s, index) => (
              <div
                key={index}
                className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                  completedSteps.includes(index)
                    ? 'bg-green-50 border-green-300'
                    : index === currentStep
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 truncate">
                    {index + 1}. {isMobile ? s.title.split(' ')[0] : s.title}
                  </span>
                  {completedSteps.includes(index) && (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 ml-1" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className={`flex gap-3 md:gap-4 ${isMobile ? 'flex-col' : ''}`}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`${
                isMobile ? 'w-full' : 'flex-1'
              } px-6 py-3 md:py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center justify-center gap-2`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className={`${
                isMobile ? 'w-full' : 'flex-1'
              } px-6 py-3 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-colors flex items-center justify-center gap-2`}
            >
              {isLastStep ? 'Complete Task' : 'Next Step'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Back to Dashboard - Desktop */}
          {!isMobile && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
