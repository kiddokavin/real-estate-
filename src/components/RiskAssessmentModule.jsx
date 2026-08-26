import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { DueDiligenceService } from '../services/dueDiligenceService';

export default function RiskAssessmentModule({ property, onOpenReportModal }) {
  // Custom risk weight sliders for underwriting simulation
  const [weights, setWeights] = useState({
    legal: 25,
    tax: 20,
    flood: 25,
    permits: 15,
    zoning: 15
  });

  const riskColor = DueDiligenceService.getRiskColor(property.compositeRiskScore);

  return (
    <div className="space-y-6">
      
      {/* Risk Gauge Header Banner */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-6">
          
          {/* Circular Risk Score Dial */}
          <div className="relative w-28 h-28 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950 shadow-inner flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full border-4 opacity-40 animate-pulse-glow"
              style={{ borderColor: riskColor.hex }}
            ></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">SCORE</span>
              <div className={`text-3xl font-black font-outfit ${riskColor.text}`}>
                {property.compositeRiskScore}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Out of 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${DueDiligenceService.getRiskBadgeClass(property.riskLevel)}`}>
                {property.riskLevel} Risk Profile
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {property.id}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5">{property.shortName}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{property.address}</p>
          </div>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
        >
          <FileSpreadsheet className="w-4 h-4" /> Download Underwriting Report
        </button>
      </div>

      {/* 5-Component Risk Breakdown Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(property.riskBreakdown).map(([key, item]) => {
          const isPass = item.status === 'Pass';
          const isWarn = item.status === 'Warning';
          return (
            <div key={key} className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="capitalize font-bold text-sm text-white flex items-center gap-1.5">
                  {key} Audit
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  isPass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  isWarn ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  Score: {item.score}/100 ({item.status})
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    item.score < 30 ? 'bg-emerald-500' : item.score < 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {item.notes}
              </p>
            </div>
          );
        })}
      </div>

      {/* Underwriting Weight Adjuster & Risk Mitigation Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Weight Adjuster */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Interactive Underwriting Weight Configurator
            </h3>
            <span className="text-xs text-slate-400 font-mono">Custom Weighting</span>
          </div>

          <div className="space-y-3 text-xs">
            {Object.keys(weights).map((category) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="capitalize font-semibold">{category} Factor Weight</span>
                  <span className="font-mono text-cyan-400 font-bold">{weights[category]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weights[category]}
                  onChange={(e) => setWeights({ ...weights, [category]: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Automated Risk Mitigation Protocol */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Automated Risk Mitigation Checklist
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Owner Title Policy:</strong> Require ALTA Owner's Policy of Title Insurance to cover quiet title guarantees.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Municipal Lien Search:</strong> Run a municipal lien search with city building department prior to closing escrow.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">FEMA Flood Elevation Certificate:</strong> Request certified surveyor elevation certificate if located in Zone AE/VE.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
