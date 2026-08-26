import React from 'react';
import {
  Building,
  ShieldAlert,
  FileText,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  ExternalLink,
  MapPin,
  CheckCircle2,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { DueDiligenceService } from '../services/dueDiligenceService';

export default function Dashboard({
  selectedProperty,
  setSelectedProperty,
  setActiveTab,
  onOpenReportModal
}) {
  const riskColor = DueDiligenceService.getRiskColor(selectedProperty.compositeRiskScore);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-outfit">4 Properties</div>
            <div className="text-xs text-slate-400">Active Property Audits</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-400 font-outfit">50% Low Risk</div>
            <div className="text-xs text-slate-400">Title & Tax Clean</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-400 font-outfit">2 Flags</div>
            <div className="text-xs text-slate-400">Flood VE & Lien Disputes</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-outfit">1.4 Seconds</div>
            <div className="text-xs text-slate-400">API Aggregation Speed</div>
          </div>
        </div>

      </div>

      {/* Selected Property Spotlight Banner */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.shortName}
              className="w-24 h-24 rounded-xl object-cover border border-slate-700 shadow-lg flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {selectedProperty.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${DueDiligenceService.getRiskBadgeClass(selectedProperty.riskLevel)}`}>
                  {selectedProperty.riskLevel} Risk
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-1.5">
                {selectedProperty.address}
              </h2>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Value: <strong className="text-slate-200">{selectedProperty.price}</strong></span>
                <span>•</span>
                <span>Built: <strong className="text-slate-200">{selectedProperty.yearBuilt}</strong></span>
                <span>•</span>
                <span>Owner: <strong className="text-slate-200">{selectedProperty.owner.name}</strong></span>
              </p>
            </div>
          </div>

          {/* Risk Score Dial Card */}
          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 w-full lg:w-auto justify-between lg:justify-start">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Risk Score</span>
              <div className={`text-3xl font-black ${riskColor.text} font-outfit mt-0.5`}>
                {selectedProperty.compositeRiskScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('due-diligence')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-all w-full justify-center"
              >
                Inspect Due Diligence <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenReportModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all w-full justify-center"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" /> Export PDF / CSV
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          {Object.entries(selectedProperty.riskBreakdown).map(([key, item]) => {
            const isPass = item.status === 'Pass';
            const isWarn = item.status === 'Warning';
            return (
              <div key={key} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="capitalize font-semibold text-slate-300">{key} Risk</span>
                  {isPass ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isWarn ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-1">{item.notes}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Property Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" /> Select Property to Evaluate
          </h3>
          <span className="text-xs text-slate-400">4 Public Record Profiles Ready</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_PROPERTIES.map((prop) => {
            const isSelected = prop.id === selectedProperty.id;
            const pRisk = DueDiligenceService.getRiskColor(prop.compositeRiskScore);
            return (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-cyan-500 bg-slate-900 border-cyan-500/40 shadow-xl'
                    : 'glass-card-hover'
                }`}
              >
                <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                  <img src={prop.image} alt={prop.shortName} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${DueDiligenceService.getRiskBadgeClass(prop.riskLevel)}`}>
                      {prop.compositeRiskScore} Score
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-sm text-white truncate">{prop.shortName}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  {prop.address}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800 text-xs">
                  <span className="text-cyan-400 font-semibold">{prop.price}</span>
                  <span className="text-slate-400">{prop.type.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
