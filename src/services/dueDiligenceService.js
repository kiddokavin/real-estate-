import { MOCK_PROPERTIES } from "../data/mockProperties";

export class DueDiligenceService {
  static searchProperties(query) {
    if (!query || query.trim() === "") return MOCK_PROPERTIES;
    const lower = query.toLowerCase();
    return MOCK_PROPERTIES.filter(
      p =>
        p.address.toLowerCase().includes(lower) ||
        p.shortName.toLowerCase().includes(lower) ||
        p.type.toLowerCase().includes(lower) ||
        p.id.toLowerCase().includes(lower)
    );
  }

  static getPropertyById(id) {
    return MOCK_PROPERTIES.find(p => p.id === id) || MOCK_PROPERTIES[0];
  }

  static validateAddress(addressString) {
    const isValid = addressString && addressString.length > 5;
    return {
      valid: isValid,
      formattedAddress: isValid ? addressString : "Invalid Address Format",
      standardizedZip: isValid ? "62704" : "00000",
      uspsValidated: isValid,
      gisCoordinates: isValid ? { lat: 39.7817, lng: -89.6501 } : null,
      confidenceScore: isValid ? 98.4 : 0.0
    };
  }

  static getRiskColor(score) {
    if (score < 25) return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", hex: "#10b981" };
    if (score < 50) return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", hex: "#f59e0b" };
    if (score < 75) return { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", hex: "#f97316" };
    return { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", hex: "#f43f5e" };
  }

  static getRiskBadgeClass(level) {
    switch (level?.toLowerCase()) {
      case "low":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "low-moderate":
      case "moderate":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "high":
      case "critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  }

  static generateExcelCSV(property) {
    const csvRows = [
      ["REAL ESTATE DUE DILIGENCE REPORT", ""],
      ["Property ID", property.id],
      ["Address", property.address],
      ["Property Type", property.type],
      ["Price", property.price],
      ["Composite Risk Score", `${property.compositeRiskScore} / 100 (${property.riskLevel} Risk)`],
      ["Legal Status", property.riskBreakdown.legal.notes],
      ["Tax History Status", property.riskBreakdown.tax.notes],
      ["Flood Zone", property.floodZone.zone],
      ["FEMA Map Number", property.floodZone.femaMapNumber],
      ["Zoning Code", property.zoning.code],
      ["Zoning Description", property.zoning.description],
      ["Zoning Compliance", property.zoning.complianceStatus],
      ["Primary Owner", property.owner.name],
      ["Deed Type", property.owner.deedType],
      ["Mortgage Status", property.owner.mortgageStatus],
      ["Active Liens Count", property.owner.liens.length]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DueDiligence_${property.id}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static printPDFReport(property) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Due Diligence Report - ${property.shortName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 30px; color: #1e293b; line-height: 1.5; }
            .header { border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; color: #0f172a; font-size: 24px; }
            .header p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; }
            .risk-banner { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
            .risk-score { font-size: 32px; font-weight: bold; color: ${property.compositeRiskScore > 50 ? '#e11d48' : '#059669'}; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 16px; font-weight: bold; color: #0284c7; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background: #f1f5f9; color: #334155; font-weight: 600; }
            .footer { font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 40px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Real Estate Due Diligence Enterprise Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()} | Document Ref: AUD-${Math.floor(Math.random()*899999+100000)}</p>
          </div>

          <div class="risk-banner">
            <div>
              <strong style="font-size: 18px;">${property.address}</strong><br/>
              <span style="color: #64748b;">${property.type} | Built in ${property.yearBuilt} | ${property.sqft}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Composite Risk Score</span><br/>
              <span class="risk-score">${property.compositeRiskScore} / 100</span><br/>
              <span style="font-size: 12px; font-weight: bold;">${property.riskLevel.toUpperCase()} RISK</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">1. Executive Summary & Ownership Details</div>
            <table>
              <tr><th>Current Owner</th><td>${property.owner.name}</td></tr>
              <tr><th>Deed Type</th><td>${property.owner.deedType}</td></tr>
              <tr><th>Mortgage Status</th><td>${property.owner.mortgageStatus}</td></tr>
              <tr><th>Active Encumbrances / Liens</th><td>${property.owner.liens.length === 0 ? "None Detected (Clean Title)" : property.owner.liens.map(l => `${l.type} - ${l.amount}`).join(", ")}</td></tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">2. Tax & Zoning Compliance Summary</div>
            <table>
              <tr><th>5-Year Tax Assessment</th><td>Average Valuation: $${(property.taxHistory.reduce((a,b)=>a+b.assessedValue,0)/property.taxHistory.length).toLocaleString()}</td></tr>
              <tr><th>Zoning Classification</th><td>${property.zoning.code} - ${property.zoning.description}</td></tr>
              <tr><th>Zoning Compliance Status</th><td>${property.zoning.complianceStatus}</td></tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">3. Environmental & Flood Risk Rating</div>
            <table>
              <tr><th>FEMA Flood Zone</th><td>${property.floodZone.zone}</td></tr>
              <tr><th>FEMA Map Panel</th><td>${property.floodZone.femaMapNumber}</td></tr>
              <tr><th>Elevation</th><td>${property.floodZone.elevation}</td></tr>
              <tr><th>Mandatory Flood Insurance</th><td>${property.floodZone.insuranceRequired ? "YES - Required by Lender" : "NO"}</td></tr>
              <tr><th>EPA Radon / UST Assessment</th><td>${property.environmental.radonRiskLevel} Radon | ${property.environmental.undergroundStorageTanks}</td></tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">4. Building Permit Audit</div>
            <table>
              <thead>
                <tr><th>Permit ID</th><th>Date</th><th>Description</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${property.permits.map(p => `
                  <tr>
                    <td>${p.id}</td>
                    <td>${p.date}</td>
                    <td>${p.description}</td>
                    <td>${p.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            Confidential Due Diligence Report generated by Real Estate Due Diligence Agent Platform &copy; ${new Date().getFullYear()}. All Rights Reserved.
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
