import { Heart } from 'lucide-react';
import { Link } from 'react-router';

export function WelcomeScreen() {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
        {/* Left side - Image - Hidden on mobile */}
        <div className="relative bg-blue-50 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1758686254056-6cd980b9aaee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjYXJlJTIwaGFwcHklMjBlbGRlcmx5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3MDI1MTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Elderly couple enjoying life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                <Heart className="w-8 h-8 text-blue-600" fill="currentColor" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Empowering Independence</h2>
              <p className="text-blue-50">Supporting your daily care with compassion and technology</p>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center transform -rotate-6">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4 text-center md:text-left">
              Welcome to<br />CareConnect
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed text-center md:text-left">
              Your comprehensive care management companion. Track medications, manage appointments, 
              and stay connected with your care team.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Medication Reminders</h3>
                <p className="text-sm text-slate-600">Never miss a dose with timely alerts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Task Guidance</h3>
                <p className="text-sm text-slate-600">Step-by-step instructions with ASL support</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Emergency Access</h3>
                <p className="text-sm text-slate-600">Quick SOS for peace of mind</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Sign In
            </Link>
            
            <Link
              to="/register"
              className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 md:py-4 rounded-xl transform active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}