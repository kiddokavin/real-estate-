import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

export default function AICopilotModule({ property }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I am your AI Due Diligence Copilot. I have analyzed ${property.address}. Ask me anything about zoning compliance, flood risks, title deed encumbrances, or tax history!`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const quickPrompts = [
    "What are the top 3 critical risks for this property?",
    "Can I build a 2-story extension under current zoning?",
    "Is flood insurance mandatory according to FEMA?",
    "Summarize title deed and lien status"
  ];

  const handleSend = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    let botReplyText = "";

    const qLower = textToSend.toLowerCase();
    if (qLower.includes('risk') || qLower.includes('critical')) {
      botReplyText = `AI Analysis for ${property.shortName}:\n• Composite Risk Score: ${property.compositeRiskScore}/100 (${property.riskLevel} Risk)\n• Primary Concern: ${property.riskBreakdown.legal.notes}\n• Flood Assessment: ${property.floodZone.zone} (${property.floodZone.rating})`;
    } else if (qLower.includes('zoning') || qLower.includes('build') || qLower.includes('extension')) {
      botReplyText = `Zoning Code: ${property.zoning.code} (${property.zoning.description}).\n• Max Allowed Height: ${property.zoning.maxHeight}\n• Front Setback: ${property.zoning.setbackFront}\n• Compliance Status: ${property.zoning.complianceStatus}`;
    } else if (qLower.includes('flood') || qLower.includes('insurance')) {
      botReplyText = `FEMA Flood Analysis:\n• Zone Rating: ${property.floodZone.zone}\n• Elevation: ${property.floodZone.elevation}\n• Mandatory Flood Insurance: ${property.floodZone.insuranceRequired ? 'YES (Required by lender)' : 'NO'}`;
    } else {
      botReplyText = `Title Deed Overview for ${property.owner.name}:\n• Deed Type: ${property.owner.deedType}\n• Liens: ${property.owner.liens.length === 0 ? 'Clean Title - Zero active liens' : property.owner.liens.map(l=>l.type+' ('+l.amount+')').join(', ')}\n• Tax Status: All recent tax payments recorded.`;
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'bot', text: botReplyText }]);
    if (!queryText) setInputQuery('');
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-outfit flex items-center gap-2">
              AI Due Diligence Risk Copilot
            </h2>
            <p className="text-[11px] text-slate-400">Natural language property intelligence powered by LLM due diligence embeddings</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
          {property.id}
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs transition-all text-left flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto space-y-3 p-4 rounded-xl bg-slate-950/80 border border-slate-900 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-md whitespace-pre-line leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask AI Copilot about zoning, flood risk, liens, or setbacks..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={() => handleSend()}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}
