import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import authApi from '../api/authApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await authApi.login(formData);
      setAuth(data.token, {
        id: data.userId,
        username: data.username,
        role: data.role,
        email: formData.email,
      });
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex animate-fade-in relative overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Left Column (Desktop) */}
      <div className="hidden lg:flex w-[55%] flex-col justify-between p-12 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(15,15,18,0.5) 0%, rgba(26,16,37,0.7) 100%)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
            <BarChart3 size={20} className="text-white" />
          </div>
          <span className="font-display font-semibold text-primary text-xl tracking-tight">FinanceOS</span>
        </div>

        <div className="relative w-full max-w-lg mx-auto flex-1 flex items-center justify-center">
          {/* Abstract geometric shapes */}
          <div className="absolute w-64 h-64 bg-brand rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-[#ec4899] rounded-full mix-blend-screen filter blur-[100px] opacity-20 -bottom-10 -right-10"></div>
          
          <div className="w-full bg-surface border border-border/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm transform rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
             <div className="w-full h-8 flex gap-2 mb-6 border-b border-border/30 pb-4">
                <div className="w-3 h-3 rounded-full bg-expense"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-income"></div>
             </div>
             <div className="h-4 w-3/4 bg-surface2 rounded mb-3"></div>
             <div className="h-4 w-1/2 bg-surface2 rounded mb-8"></div>
             <div className="flex gap-4">
                <div className="h-24 w-1/3 bg-brand-dim rounded-xl border border-brand/20"></div>
                <div className="h-24 w-1/3 bg-income-dim rounded-xl border border-income/20"></div>
                <div className="h-24 w-1/3 bg-expense-dim rounded-xl border border-expense/20"></div>
             </div>
          </div>
        </div>

        <div className="bg-[#16161aa6] backdrop-blur-md border border-border rounded-2xl p-6 max-w-lg">
          <p className="text-primary font-medium text-lg mb-4 leading-relaxed tracking-tight">
            "FinanceOS gives our team complete visibility into our financial operations, allowing us to hit our quarterly targets consistently."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center text-sm font-semibold">SA</div>
            <div>
              <p className="text-sm font-semibold text-primary font-display">Sarah Anderson</p>
              <p className="text-xs text-muted">CFO, Nexus Industries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Login Form) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 relative z-10">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
              <BarChart3 size={20} className="text-white" />
            </div>
            <span className="font-display font-semibold text-primary text-2xl tracking-tight">FinanceOS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-primary font-display tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted">Sign in to your dashboard to continue.</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3.5 top-[34px] text-muted hover:text-primary focus:outline-none transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full py-3 mt-2 text-base shadow-glow"
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
             <Lock size={12} />
             <span>Secured with 256-bit JWT encryption</span>
          </div>

          <div className="mt-8 text-center text-xs text-muted bg-surface2/50 rounded-xl p-4 border border-border border-dashed">
            <p className="mb-2 font-medium">Demo Admin Access:</p>
            <p>Email: <span className="text-primary font-mono select-all">admin@finance.com</span></p>
            <p>Password: <span className="text-primary font-mono select-all">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
