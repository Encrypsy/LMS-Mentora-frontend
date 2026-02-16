import React, { useState } from "react";
import { Button, Input, Card, cn } from "../components/lms-ui";
import { 
  Mail as MailIcon, 
  Lock as LockIcon, 
  Eye as EyeIcon, 
  EyeOff as EyeOffIcon, 
  User as UserIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  ArrowLeft as ArrowLeftIcon 
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "framer-motion";

interface AuthProps {
  onNavigate: (page: string) => void;
  onLogin: (role: 'student' | 'teacher' | 'admin') => void;
}

export const LoginPage = ({ onNavigate, onLogin }: AuthProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left side: Illustration */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center z-10"
        >
          <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl rotate-2">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" 
              className="w-full aspect-video object-cover"
              alt="Education"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">Empower Your Learning Journey</h1>
          <p className="text-indigo-100 text-lg">
            Access world-class resources, connect with experts, and advance your career with our modern LMS platform.
          </p>
        </motion.div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4">
              <div className="text-2xl font-bold">L</div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-1">Please enter your details to sign in</p>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/50">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin('student'); }}>
              <Input 
                label="Email or Username" 
                placeholder="john@example.com"
                icon={<MailIcon size={18} />}
              />
              <div className="relative">
                <Input 
                  label="Password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<LockIcon size={18} />}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => onNavigate('forgot-password')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <Button className="w-full py-3" type="submit">Login</Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full flex gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Login with Google
              </Button>
            </form>
          </Card>

          <p className="text-center mt-8 text-slate-600">
            Don't have an account?{" "}
            <button 
              onClick={() => onNavigate('signup')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const SignUpPage = ({ onNavigate }: AuthProps) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
       <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center z-10"
        >
          <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl -rotate-2">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000" 
              className="w-full aspect-video object-cover"
              alt="Education"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">Start Your Future Today</h1>
          <p className="text-indigo-100 text-lg">
            Join thousands of students and educators worldwide in the most advanced learning ecosystem.
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4">
              <div className="text-2xl font-bold">L</div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-1">Join our community and start learning</p>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/50">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
              <button 
                onClick={() => setRole('student')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer",
                  role === 'student' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Student
              </button>
              <button 
                onClick={() => setRole('teacher')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer",
                  role === 'teacher' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Teacher
              </button>
            </div>

            <form className="space-y-4">
              <Input label="Full Name" placeholder="John Doe" icon={<UserIcon size={18} />} />
              <Input label="Email Address" placeholder="john@example.com" icon={<MailIcon size={18} />} />
              <Input label="Password" type="password" placeholder="••••••••" icon={<LockIcon size={18} />} />
              <Input label="Confirm Password" type="password" placeholder="••••••••" icon={<LockIcon size={18} />} />

              <label className="flex items-start gap-2 cursor-pointer mt-2">
                <input type="checkbox" className="w-4 h-4 mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                </span>
              </label>

              <Button className="w-full py-3 mt-2">Create Account</Button>
            </form>
          </Card>

          <p className="text-center mt-8 text-slate-600">
            Already have an account?{" "}
            <button 
              onClick={() => onNavigate('login')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              Login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage = ({ onNavigate }: AuthProps) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="text-center border-none shadow-xl shadow-slate-200/50 p-8">
          {submitted ? (
            <div className="py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <CheckCircle2Icon size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
              <p className="text-slate-500 mb-8">
                We have sent a password recovery link to your email address.
              </p>
              <Button onClick={() => onNavigate('login')} className="w-full">Back to Login</Button>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
                <LockIcon size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h2>
              <p className="text-slate-500 mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <Input 
                  label="Email Address" 
                  placeholder="john@example.com"
                  icon={<MailIcon size={18} />}
                  required
                />
                <Button className="w-full py-3" type="submit">Send Reset Link</Button>
              </form>
              <button 
                onClick={() => onNavigate('login')}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeftIcon size={16} />
                Back to Login
              </button>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};
