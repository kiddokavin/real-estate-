import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ShieldCheck, AlertCircle, Building, Filter, ExternalLink } from 'lucide-react';
import { DueDiligenceService } from '../services/dueDiligenceService';
import { MOCK_PROPERTIES } from '../data/mockProperties';

export default function PropertySearchModule({
  searchQuery,
  setSearchQuery,
  onSelectProperty,
  setActiveTab
}) {
  const [filterType, setFilterType] = useState('All');
  const filteredProperties = DueDiligenceService.searchProperties(searchQuery).filter(p => {
    if (filterType === 'All') return true;
    return p.type.toLowerCase().includes(filterType.toLowerCase());
  });

  const validationResult = DueDiligenceService.validateAddress(searchQuery || "742 Evergreen Terrace");

  return (
    <div className="space-y-6">
      
      {/* Header & Search Bar */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" /> Property Search & Address Validation Module
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Query public records, land registry, and municipal GIS databases with real-time address normalization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Enter full property address (e.g. 742 Evergreen Terrace, Springfield, IL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Property Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Hospitality">Hospitality / Mixed-Use</option>
            </select>
          </div>
        </div>

        {/* Address Normalization / GIS Validation Box */}
        {searchQuery && (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-slate-300 font-semibold">USPS & GIS Address Validated: </span>
                <span className="text-cyan-300">{validationResult.formattedAddress}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-slate-400">
              <span>GIS Lat/Lng: 39.7817, -89.6501</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                {validationResult.confidenceScore}% Match
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Property Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map((prop) => {
          const riskInfo = DueDiligenceService.getRiskColor(prop.compositeRiskScore);
          return (
            <div
              key={prop.id}
              className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {prop.id}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{prop.shortName}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {prop.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${DueDiligenceService.getRiskBadgeClass(prop.riskLevel)}`}>
                      {prop.riskLevel} Risk ({prop.compositeRiskScore}/100)
                    </span>
                    <div className="text-sm font-extrabold text-cyan-400 mt-2">{prop.price}</div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Type</div>
                    <div className="font-semibold text-slate-300 truncate">{prop.type.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">FEMA Flood</div>
                    <div className="font-semibold text-slate-300 truncate">{prop.floodZone.zone.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Zoning</div>
                    <div className="font-semibold text-slate-300 truncate">{prop.zoning.code}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    onSelectProperty(prop);
                    setActiveTab('due-diligence');
                  }}
                  className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" /> Start Full Due Diligence
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
