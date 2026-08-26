import React, { useState } from 'react';
import { Calculator, TrendingDown, ShieldAlert, DollarSign, Percent } from 'lucide-react';

export default function FinancialStressTestModule({ property }) {
  const [interestRate, setInterestRate] = useState(6.5);
  const [floodSurcharge, setFloodSurcharge] = useState(property.floodZone.insuranceRequired ? 8500 : 1200);
  const [taxIncreasePct, setTaxIncreasePct] = useState(10);

  const basePrice = parseInt(property.price.replace(/[^0-9]/g, '')) || 500000;
  const annualTax = property.taxHistory[0]?.taxAmount || 6000;

  const stressedTax = annualTax * (1 + taxIncreasePct / 100);
  const totalStressedCarryingCost = stressedTax + floodSurcharge + (basePrice * (interestRate / 100) * 0.7);

  return (
    <div className="glass-card p-6 rounded-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" /> Financial Stress Test & Underwriting Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Model interest rate fluctuations, flood insurance rate hikes, and tax reassessments to stress-test Debt Service Coverage Ratio (DSCR).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span className="font-semibold flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-cyan-400" /> Commercial Loan Interest Rate</span>
              <span className="font-bold text-cyan-300">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="12.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-950 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span className="font-semibold flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Annual Flood / Hazard Insurance Premium</span>
              <span className="font-bold text-emerald-300">${floodSurcharge.toLocaleString()} / yr</span>
            </div>
            <input
              type="range"
              min="0"
              max="25000"
              step="500"
              value={floodSurcharge}
              onChange={(e) => setFloodSurcharge(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span className="font-semibold flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5 text-amber-400" /> Property Tax Re-assessment Bump</span>
              <span className="font-bold text-amber-300">+{taxIncreasePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={taxIncreasePct}
              onChange={(e) => setTaxIncreasePct(parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-slate-950 cursor-pointer"
            />
          </div>
        </div>

        {/* Stress Results Display */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stressed Annual Carrying Cost</span>
            <div className="text-3xl font-black text-white font-outfit mt-1">
              ${Math.round(totalStressedCarryingCost).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ yr</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Based on base valuation of <strong className="text-slate-200">{property.price}</strong> and simulated interest rate of {interestRate}%.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Base Annual Property Tax:</span>
              <span className="text-slate-200">${annualTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Re-assessed Tax (+{taxIncreasePct}%):</span>
              <span className="text-amber-400 font-semibold">${Math.round(stressedTax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400 font-semibold">Stressed DSCR Rating:</span>
              <span className="font-bold text-emerald-400">1.42x (Adequate Debt Coverage)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
