import React from 'react';
import { BarChart3, TrendingUp, MapPin, DollarSign, ArrowUpRight, Building } from 'lucide-react';

export default function ComparablePropertyModule({ property }) {
  const comps = property.comparables || [];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" /> Comparable Property & Market Valuation Module
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing recent arm's-length sales transactions within 0.5-mile radius of {property.shortName}.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Subject Price</div>
            <div className="font-extrabold text-cyan-400 text-sm">{property.price}</div>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Area / Size</div>
            <div className="font-semibold text-slate-200 text-sm">{property.sqft}</div>
          </div>
        </div>
      </div>

      {/* Market Comps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comps.map((comp, idx) => (
          <div key={idx} className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                Comp #{idx + 1}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" /> {comp.distance}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">{comp.address}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Sold on {comp.soldDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Sale Price</span>
                <span className="font-extrabold text-emerald-400 text-sm">{comp.price}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Price / SqFt</span>
                <span className="font-semibold text-cyan-300 text-sm">${comp.pricePerSqft} / sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5-Year Valuation Trend Chart Visualizer */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> 5-Year Historical Market Valuation Growth
          </h3>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            +25.0% 5-Yr Growth Trend
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-4 bg-slate-900/60 rounded-xl border border-slate-800">
          {property.taxHistory.slice().reverse().map((t, i) => {
            const heightPct = Math.round((t.assessedValue / property.taxHistory[0].assessedValue) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-bold text-cyan-300 opacity-80 group-hover:opacity-100 transition-opacity">
                  ${(t.assessedValue / 1000).toFixed(0)}k
                </div>
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-lg transition-all group-hover:brightness-125"
                  style={{ height: `${Math.max(20, heightPct * 0.8)}%` }}
                ></div>
                <div className="text-xs font-semibold text-slate-400 mt-1">{t.year}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
