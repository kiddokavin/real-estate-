import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Shield, CheckCircle2, ArrowRight, KeyRound, RefreshCw, X, Sparkles } from 'lucide-react';
import { USER_ROLES } from '../data/mockProperties';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('register'); // 'register' | 'otp' | 'login'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: 'buyer'
  });

  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(60);

  // Generate 6-digit OTP when entering OTP mode
  const triggerSendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setMode('otp');
    setOtpError('');
    setTimer(60);
  };

  useEffect(() => {
    let interval;
    if (mode === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otpCode.join('');
    if (enteredOtp === generatedOtp || enteredOtp === '123456') {
      const selectedRole = USER_ROLES.find(r => r.id === formData.roleId) || USER_ROLES[0];
      onAuthSuccess({
        fullName: formData.fullName || "Verified User",
        email: formData.email || "user@example.com",
        role: selectedRole
      });
      onClose();
    } else {
      setOtpError('Invalid OTP Code. Please check your email or use the demo code.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-slate-800 space-y-5 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-outfit">
              {mode === 'register' ? 'Account Registration' : mode === 'otp' ? 'Email OTP Verification' : 'User Login'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode 1: Registration Form */}
        {mode === 'register' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              triggerSendOtp();
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address (OTP will be sent here)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="alex.morgan@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select Access Role</label>
              <select
                value={formData.roleId}
                onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                {USER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>{r.name} ({r.badge})</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
            >
              Send Email OTP Code <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode 2: OTP Verification Screen */}
        {mode === 'otp' && (
          <div className="space-y-4 text-center">
            
            {/* Simulation Notification Card */}
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-left text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4" /> Email Dispatch Simulator
              </div>
              <p className="text-slate-300">
                OTP sent to <strong className="text-white">{formData.email}</strong>
              </p>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-center text-sm font-extrabold text-cyan-300 tracking-wider">
                Verification OTP: {generatedOtp}
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Enter the 6-digit verification code sent to your inbox:
            </p>

            {/* 6 Digit Inputs */}
            <div className="flex justify-center gap-2">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-bold bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              ))}
            </div>

            {otpError && (
              <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/30">
                {otpError}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Resend code in: <strong className="text-cyan-400">{timer}s</strong></span>
              <button
                onClick={triggerSendOtp}
                disabled={timer > 0}
                className="text-cyan-400 hover:underline disabled:opacity-50 flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Resend OTP
              </button>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Complete Registration & Verify
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
