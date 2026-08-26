import React, { useState } from 'react';
import { X, FileSpreadsheet, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DueDiligenceService } from '../services/dueDiligenceService';

export default function ReportGeneratorModal({ property, onClose }) {
  const [includeComps, setIncludeComps] = useState(true);
  const [includePermits, setIncludePermits] = useState(true);
  const [includeEnvironmental, setIncludeEnvironmental] = useState(true);
  const [reportFormat, setReportFormat] = useState('pdf');

  const handleExport = () => {
    if (reportFormat === 'excel') {
      DueDiligenceService.generateExcelCSV(property);
    } else {
      DueDiligenceService.printPDFReport(property);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card max-w-lg w-full p-6 rounded-2xl border border-slate-800 space-y-5 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-outfit">Export Due Diligence Report</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400">Target Property:</span>
          <div className="font-bold text-sm text-white">{property.address}</div>
          <div className="text-xs text-cyan-400 font-semibold mt-0.5">
            Composite Risk Score: {property.compositeRiskScore}/100 ({property.riskLevel} Risk)
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300">Select Export Format</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setReportFormat('pdf')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                reportFormat === 'pdf'
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer className="w-4 h-4" /> Printable PDF Document
            </button>

            <button
              onClick={() => setReportFormat('excel')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                reportFormat === 'excel'
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-4 h-4" /> Excel / CSV Data Sheet
            </button>
          </div>
        </div>

        {/* Report Section Toggles */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-300">Configure Report Modules</span>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeComps}
                onChange={(e) => setIncludeComps(e.target.checked)}
                className="rounded accent-cyan-500"
              />
              Include Comparable Market Sales Analysis
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includePermits}
                onChange={(e) => setIncludePermits(e.target.checked)}
                className="rounded accent-cyan-500"
              />
              Include Municipal Building Permit Logs
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeEnvironmental}
                onChange={(e) => setIncludeEnvironmental(e.target.checked)}
                className="rounded accent-cyan-500"
              />
              Include FEMA Flood & EPA Environmental Records
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleExport();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
          >
            <ShieldCheck className="w-4 h-4" /> Generate & Download Report
          </button>
        </div>

      </div>
    </div>
  );
}
