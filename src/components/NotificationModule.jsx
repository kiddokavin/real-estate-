import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function NotificationModule({ notifications, onClear, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20 bg-slate-950/40 backdrop-blur-sm">
      <div className="glass-card max-w-sm w-full p-4 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">System Notifications</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">{n.title}</span>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <p className="text-slate-300 text-[11px]">{n.message}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClear}
          className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[11px] font-medium text-center"
        >
          Clear All Notifications
        </button>
      </div>
    </div>
  );
}
