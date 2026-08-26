import React, { useState } from 'react';
import { USER_ROLES } from '../data/mockProperties';
import { UserCheck, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function RoleSwitcher({ currentRole, onRoleChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all text-xs font-medium text-slate-200 shadow-sm"
      >
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline text-slate-400">Role:</span>
        <span className="text-cyan-300 font-semibold">{currentRole.name}</span>
        <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
          {currentRole.badge}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl">
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Access Role</span>
            <UserCheck className="w-4 h-4 text-cyan-400" />
          </div>

          {USER_ROLES.map((role) => {
            const isSelected = currentRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  onRoleChange(role);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between ${
                  isSelected
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-white font-medium'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                    {role.name}
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((p, idx) => (
                      <span key={idx} className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
