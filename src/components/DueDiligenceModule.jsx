import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  ShieldAlert,
  Map,
  Wrench,
  Leaf,
  Plug,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building,
  FileSpreadsheet
} from 'lucide-react';
import { DueDiligenceService } from '../services/dueDiligenceService';

export default function DueDiligenceModule({ property, onOpenReportModal }) {
  const [activeSubTab, setActiveSubTab] = useState('ownership');

  const subTabs = [
    { id: 'ownership', label: 'Ownership & Title', icon: FileText },
    { id: 'tax-history', label: 'Property Tax History', icon: DollarSign },
    { id: 'permits', label: 'Building Permits', icon: Wrench },
    { id: 'zoning', label: 'Zoning Regulations', icon: Building },
    { id: 'flood-env', label: 'Flood & Environment', icon: Map },
    { id: 'utilities', label: 'Utility Infrastructure', icon: Plug }
  ];

  return (
    <div className="space-y-6">
      
      {/* Property Summary Header Card */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {property.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${DueDiligenceService.getRiskBadgeClass(property.riskLevel)}`}>
              {property.riskLevel} Risk Profile ({property.compositeRiskScore}/100)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{property.address}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {property.type} • Built {property.yearBuilt} • {property.sqft} • Current Owner: <span className="text-slate-200">{property.owner.name}</span>
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export Due Diligence PDF / CSV
        </button>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 overflow-x-auto pb-2">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Ownership & Title Deed */}
      {activeSubTab === 'ownership' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Title Deed & Encumbrance Record
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Primary Registered Owner</span>
                <span className="font-semibold text-white">{property.owner.name}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Deed Type</span>
                <span className="font-semibold text-cyan-300">{property.owner.deedType}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Purchase Transfer Date</span>
                <span className="font-semibold text-slate-200">{property.owner.purchaseDate}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Mortgage & Financing Status</span>
                <span className="font-medium text-slate-200">{property.owner.mortgageStatus}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Active Liens & Historical Chain of Custody
            </h3>

            {/* Liens List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Recorded Liens & Encumbrances:</span>
              {property.owner.liens.length === 0 ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Clean Title Deed — Zero active liens or legal encumbrances detected.
                </div>
              ) : (
                property.owner.liens.map((lien, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                    <div className="flex justify-between text-rose-300 font-bold">
                      <span>{lien.type} ({lien.claimant})</span>
                      <span>{lien.amount}</span>
                    </div>
                    <div className="text-slate-400 flex justify-between">
                      <span>Filed: {lien.filedDate}</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 font-semibold">{lien.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chain of Custody Table */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Historical Chain of Title:</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                      <th className="pb-2">Year Range</th>
                      <th className="pb-2">Owner Name</th>
                      <th className="pb-2">Transfer Type</th>
                      <th className="pb-2">Recorded Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {property.owner.chainOfCustody.map((c, i) => (
                      <tr key={i}>
                        <td className="py-2">{c.year}</td>
                        <td className="py-2 font-medium">{c.owner}</td>
                        <td className="py-2 text-slate-400">{c.transferType}</td>
                        <td className="py-2 font-semibold text-cyan-400">{c.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Property Tax History */}
      {activeSubTab === 'tax-history' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Municipal Tax Assessment & Payment History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <th className="p-3">Tax Year</th>
                  <th className="p-3">Assessed Property Value</th>
                  <th className="p-3">Annual Tax Amount</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {property.taxHistory.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{t.year}</td>
                    <td className="p-3 font-semibold text-cyan-300">${t.assessedValue.toLocaleString()}</td>
                    <td className="p-3 font-semibold text-slate-200">${t.taxAmount.toLocaleString()}</td>
                    <td className="p-3 text-slate-400">{t.taxDueDate}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        t.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Building Permits */}
      {activeSubTab === 'permits' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" /> Building Permits & Code Enforcement History
          </h3>

          <div className="space-y-3">
            {property.permits.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold">{p.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{p.date}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{p.department}</span>
                  </div>
                  <div className="text-sm font-semibold text-white mt-1">{p.description}</div>
                </div>

                <span className={`px-3 py-1 rounded-lg text-xs font-bold border whitespace-nowrap ${
                  p.status.toLowerCase().includes('closed') || p.status.toLowerCase().includes('completed')
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Zoning Regulations */}
      {activeSubTab === 'zoning' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" /> Municipal Zoning Code & Setback Requirements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Zoning Designation</span>
              <span className="font-bold text-cyan-300">{property.zoning.code}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Description</span>
              <span className="font-semibold text-slate-200">{property.zoning.description}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Maximum Allowed Height</span>
              <span className="font-semibold text-slate-200">{property.zoning.maxHeight}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Floor-Area Ratio (FAR)</span>
              <span className="font-semibold text-slate-200">{property.zoning.floorAreaRatio}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Front Setback</span>
              <span className="font-semibold text-slate-200">{property.zoning.setbackFront}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Rear Setback</span>
              <span className="font-semibold text-slate-200">{property.zoning.setbackRear}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Zoning Compliance Status</span>
            <div className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {property.zoning.complianceStatus}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Flood & Environment */}
      {activeSubTab === 'flood-env' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-400" /> FEMA Flood Zone Verification
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">FEMA Flood Zone</span>
                <span className="font-bold text-cyan-300">{property.floodZone.zone}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">FEMA Panel Number</span>
                <span className="font-mono text-slate-300">{property.floodZone.femaMapNumber}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Ground Elevation</span>
                <span className="font-semibold text-slate-200">{property.floodZone.elevation}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Mandatory Flood Insurance</span>
                <span className={`font-bold ${property.floodZone.insuranceRequired ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {property.floodZone.insuranceRequired ? 'REQUIRED' : 'NOT REQUIRED'}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> EPA Environmental Records
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Underground Storage Tanks (UST)</span>
                <span className="font-semibold text-slate-200">{property.environmental.undergroundStorageTanks}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">EPA Superfund Site Proximity</span>
                <span className="font-semibold text-emerald-400">Clear (&gt; 2.5 miles)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Radon Hazard Level</span>
                <span className="font-semibold text-slate-200">{property.environmental.radonRiskLevel}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Asbestos / Lead Assessment</span>
                <span className="font-semibold text-slate-200">{property.environmental.asbestosAssessment}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Utilities */}
      {activeSubTab === 'utilities' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plug className="w-4 h-4 text-cyan-400" /> Municipal Utility Infrastructure Grid
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Potable Water Provider</span>
              <div className="font-bold text-white text-sm">{property.utilities.water}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Sanitary Sewer Connection</span>
              <div className="font-bold text-white text-sm">{property.utilities.sewer}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Electric Utility Grid</span>
              <div className="font-bold text-white text-sm">{property.utilities.electricity}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Natural Gas Infrastructure</span>
              <div className="font-bold text-white text-sm">{property.utilities.gas}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
