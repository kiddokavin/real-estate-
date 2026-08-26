import React from 'react';
import { History, Shield, Server, Activity, ArrowUpRight } from 'lucide-react';

export default function AuditModule() {
  const auditLogs = [
    { id: "LOG-9921", time: "11:10:45 AM", user: "Buyer / Investor", action: "Address Validation Query", target: "742 Evergreen Terrace", latency: "142 ms", status: "200 OK" },
    { id: "LOG-9920", time: "11:08:12 AM", user: "Legal Specialist", action: "Lien Chain Audit Request", target: "450 Ocean Drive", latency: "310 ms", status: "200 OK" },
    { id: "LOG-9919", time: "11:04:30 AM", user: "Financial Institution", action: "Tax History Assessment API", target: "100 Wall Street", latency: "215 ms", status: "200 OK" },
    { id: "LOG-9918", time: "10:55:04 AM", user: "System Admin", action: "FEMA Map Layer Refresh", target: "FEMA API Gateway", latency: "480 ms", status: "200 OK" },
    { id: "LOG-9917", time: "10:42:18 AM", user: "Real Estate Agent", action: "Due Diligence PDF Export", target: "1800 Industrial Pkwy", latency: "850 ms", status: "200 OK" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" /> System Audit & API Gateway Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immutable activity trail for compliance, security event monitoring, and third-party API response metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            System Status: Operational
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-lg font-bold text-white">99.98% Uptime</div>
            <div className="text-xs text-slate-400">API Gateway Health</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <Server className="w-5 h-5 text-purple-400" />
          <div>
            <div className="text-lg font-bold text-white">248 ms Avg Latency</div>
            <div className="text-xs text-slate-400">Public Record Queries</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-lg font-bold text-white">0 Security Flags</div>
            <div className="text-xs text-slate-400">Role Access Control</div>
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white">Real-Time Event Stream</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <th className="p-3">Log Reference</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User Role</th>
                <th className="p-3">Executed Action</th>
                <th className="p-3">Target Entity</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Gateway Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">{log.id}</td>
                  <td className="p-3 text-slate-400">{log.time}</td>
                  <td className="p-3 font-semibold text-slate-200">{log.user}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3 font-medium text-white">{log.target}</td>
                  <td className="p-3 font-mono text-cyan-300">{log.latency}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
