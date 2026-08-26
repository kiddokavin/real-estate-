import React, { useState } from 'react';
import { GitCompare, Building, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { DueDiligenceService } from '../services/dueDiligenceService';

export default function SideBySideCompareModule() {
  const [propA, setPropA] = useState(MOCK_PROPERTIES[0]);
  const [propB, setPropB] = useState(MOCK_PROPERTIES[1]);

  return (
    <div className="glass-card p-6 rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-cyan-400" /> Side-by-Side Dual Property Comparison Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">Compare risk indicators, zoning constraints, tax obligations, and FEMA flood ratings across two properties.</p>
        </div>
      </div>

      {/* Property Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Selector A */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Property A (Baseline)</label>
          <select
            value={propA.id}
            onChange={(e) => setPropA(MOCK_PROPERTIES.find(p => p.id === e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {MOCK_PROPERTIES.map(p => (
              <option key={p.id} value={p.id}>{p.shortName} ({p.price})</option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Property B (Comparison Target)</label>
          <select
            value={propB.id}
            onChange={(e) => setPropB(MOCK_PROPERTIES.find(p => p.id === e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {MOCK_PROPERTIES.map(p => (
              <option key={p.id} value={p.id}>{p.shortName} ({p.price})</option>
            ))}
          </select>
        </div>

      </div>

      {/* Side-by-Side Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <th className="p-3">Audit Metric</th>
              <th className="p-3 text-cyan-400 font-bold">{propA.shortName}</th>
              <th className="p-3 text-purple-400 font-bold">{propB.shortName}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            <tr>
              <td className="p-3 font-semibold text-slate-400">Composite Risk Score</td>
              <td className="p-3 font-bold text-lg text-emerald-400">{propA.compositeRiskScore} / 100 ({propA.riskLevel})</td>
              <td className="p-3 font-bold text-lg text-amber-400">{propB.compositeRiskScore} / 100 ({propB.riskLevel})</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-400">Listed Market Price</td>
              <td className="p-3 font-bold text-cyan-300">{propA.price}</td>
              <td className="p-3 font-bold text-cyan-300">{propB.price}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-400">Property Type</td>
              <td className="p-3">{propA.type}</td>
              <td className="p-3">{propB.type}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-400">FEMA Flood Rating</td>
              <td className="p-3">{propA.floodZone.zone}</td>
              <td className="p-3">{propB.floodZone.zone}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-400">Zoning Designation</td>
              <td className="p-3 font-mono">{propA.zoning.code}</td>
              <td className="p-3 font-mono">{propB.zoning.code}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-400">Active Liens Count</td>
              <td className="p-3">{propA.owner.liens.length === 0 ? "Clean (0 Liens)" : `${propA.owner.liens.length} Lien`}</td>
              <td className="p-3">{propB.owner.liens.length === 0 ? "Clean (0 Liens)" : `${propB.owner.liens.length} Lien`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
