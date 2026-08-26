import React, { useState } from 'react';
import { FileUp, FileText, CheckCircle2, ScanText, Loader2, Sparkles, Download } from 'lucide-react';

export default function TitleDeedOCRModule() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const simulateScan = (filename) => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult({
        documentName: filename || "Warranty_Deed_Springfield_742.pdf",
        confidence: "99.2%",
        grantor: "Springfield Realty Corp",
        grantee: "Homer J. Simpson & Marge Simpson",
        recordedDate: "June 15, 1994",
        deedBookPage: "Book 412, Page 88",
        parcelId: "APN-17-083-0210",
        legalDescription: "LOT 7, BLOCK 4 OF EVERGREEN TERRACE SUBDIVISION, CITY OF SPRINGFIELD, IL",
        liensDetected: 0,
        ocrStatus: "Clean Title Deed Verification Passed"
      });
    }, 1500);
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
          <ScanText className="w-5 h-5 text-cyan-400" /> AI Title Deed OCR & Document Scanner
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Upload title deeds, tax receipts, or FEMA elevation certificates to automatically extract parcel metadata using Computer Vision & OCR.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onClick={() => simulateScan("Deed_Audit_Document_2025.pdf")}
        className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-8 text-center cursor-pointer bg-slate-900/60 transition-all group"
      >
        <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <FileUp className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-white">Click or Drop Legal PDF Document Here</div>
        <p className="text-xs text-slate-400 mt-1">Supports PDF, PNG, TIFF, JPG (Title Deeds, Tax Receipts, Closing Disclosures)</p>
      </div>

      {/* Scanning Loader */}
      {isScanning && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-cyan-300">Scanning document text & extracting title deed fields...</div>
        </div>
      )}

      {/* OCR Results Grid */}
      {scannedResult && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm font-bold text-white">{scannedResult.documentName}</div>
                <div className="text-xs text-emerald-400 font-medium">OCR Confidence: {scannedResult.confidence}</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {scannedResult.ocrStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Grantor (Seller):</span>
              <span className="font-semibold text-slate-200">{scannedResult.grantor}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Grantee (Buyer):</span>
              <span className="font-semibold text-cyan-300">{scannedResult.grantee}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Recorded Transfer Date:</span>
              <span className="font-semibold text-slate-200">{scannedResult.recordedDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Book & Page Ref:</span>
              <span className="font-mono text-cyan-400 font-semibold">{scannedResult.deedBookPage}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1">Extracted Legal Land Description:</span>
            <div className="font-mono text-slate-300">{scannedResult.legalDescription}</div>
          </div>
        </div>
      )}
    </div>
  );
}
