import { useState } from 'react';
import { Eye, EyeOff, LogIn, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/authStore';

export function LoginScreen() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3">
            <Heart className="w-8 md:w-10 h-8 md:h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Sign In</h1>
          <p className="text-slate-500 mt-2 text-center text-sm md:text-base">Welcome back to CareConnect</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-600 text-sm">Remember me</span>
            </label>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-800 text-left sm:text-right">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
            ) : (
              <>
                <span>Sign In</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 md:mt-8 pt-6 border-t border-slate-100 text-center">
          <Link 
            to="/welcome"
            className="text-sm text-slate-500 hover:text-slate-700 mb-4 block w-full"
          >
            ← Back to welcome
          </Link>
          <p className="text-slate-600 text-sm md:text-base">
            Don't have an account?{' '}
            <Link 
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}