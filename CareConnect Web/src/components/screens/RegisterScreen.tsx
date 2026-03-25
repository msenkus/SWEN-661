import { useState } from 'react';
import { Eye, EyeOff, UserPlus, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/authStore';

export function RegisterScreen() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 overflow-y-auto">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-4">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-3">
            <Heart className="w-8 md:w-10 h-8 md:h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2 text-center text-sm md:text-base">Join CareConnect today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700 block">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 block">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-bold text-slate-700 block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 block">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              required
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5" required />
            <span className="text-slate-600 text-sm">
              I agree to the <button type="button" className="text-blue-600 hover:underline font-semibold">Terms of Service</button> and <button type="button" className="text-blue-600 hover:underline font-semibold">Privacy Policy</button>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-sm md:text-base">
            Already have an account?{' '}
            <Link 
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}