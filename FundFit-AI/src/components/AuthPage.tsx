import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface AuthPageProps {
  onSuccessLogin: () => void;
  onBackToHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccessLogin, onBackToHome }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'mfa'>('login');
  const [email, setEmail] = useState('investor@fundfit.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [mfaCode, setMfaCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login' || authMode === 'register') {
      setAuthMode('mfa');
    } else {
      onSuccessLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex items-center justify-center p-4 relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="glass-card max-w-md w-full p-8 border-indigo-500/30 space-y-6 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2" onClick={onBackToHome}>
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-extrabold text-sm tracking-tight text-white">FUND FIT <span className="text-indigo-400">AI</span></span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">
            {authMode === 'mfa' ? '2-Factor Security' : authMode === 'login' ? 'Sign In to Portal' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {authMode === 'mfa' 
              ? 'Enter the 6-digit verification code sent to your device.' 
              : authMode === 'login' 
              ? 'Access institutional mutual fund intelligence & portfolio analytics.'
              : 'Join 100k+ investors optimizing mutual fund wealth with AI.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {authMode !== 'mfa' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Work or Personal Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-9 text-xs py-2.5"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-semibold">Password</label>
                  {authMode === 'login' && (
                    <button type="button" className="text-indigo-400 text-[11px] hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-9 text-xs py-2.5"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full text-xs justify-center py-2.5 mt-2">
                <span>{authMode === 'login' ? 'Continue to MFA' : 'Create Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>MFA Authenticator code sent to ***-***-8920</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">6-Digit Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="849201"
                  className="input-field text-center tracking-[0.5em] text-base font-mono py-2.5"
                />
              </div>

              <button type="submit" className="btn-primary w-full text-xs justify-center py-2.5 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Verify & Enter Dashboard</span>
              </button>
            </>
          )}

        </form>

        {/* Social SSO buttons */}
        {authMode !== 'mfa' && (
          <div className="space-y-3 pt-2 border-t border-white/10 text-center">
            <div className="text-[11px] text-slate-500 font-semibold">Or continue with Enterprise SSO</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button onClick={onSuccessLogin} className="btn-secondary text-[11px] justify-center py-2">Google</button>
              <button onClick={onSuccessLogin} className="btn-secondary text-[11px] justify-center py-2">Microsoft</button>
              <button onClick={onSuccessLogin} className="btn-secondary text-[11px] justify-center py-2">Apple</button>
            </div>
          </div>
        )}

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-400 pt-1">
          {authMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('register')} className="text-indigo-400 font-semibold hover:underline">
                Sign up free
              </button>
            </span>
          ) : authMode === 'register' ? (
            <span>
              Already registered?{' '}
              <button onClick={() => setAuthMode('login')} className="text-indigo-400 font-semibold hover:underline">
                Sign in
              </button>
            </span>
          ) : null}
        </div>

      </div>

    </div>
  );
};
