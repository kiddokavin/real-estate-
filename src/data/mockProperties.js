export const MOCK_PROPERTIES = [
  {
    id: "PROP-101",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    shortName: "Evergreen Residential",
    type: "Residential Single-Family",
    price: "$485,000",
    sqft: "2,450 sq ft",
    yearBuilt: 1994,
    status: "Verified",
    riskLevel: "Low",
    compositeRiskScore: 18, // 0-100 (Lower is safer)
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    owner: {
      name: "Homer & Marge Simpson",
      deedType: "Warranty Deed",
      purchaseDate: "1994-06-15",
      chainOfCustody: [
        { year: "1994 - Present", owner: "Homer & Marge Simpson", transferType: "Grant Deed", price: "$145,000" },
        { year: "1982 - 1994", owner: "Springfield Realty Corp", transferType: "Subdivision Sale", price: "$82,000" }
      ],
      liens: [],
      mortgageStatus: "Active - First National Bank of Springfield ($112,000 remaining)"
    },
    taxHistory: [
      { year: 2025, assessedValue: 450000, taxAmount: 6750, status: "Paid", taxDueDate: "2025-11-30" },
      { year: 2024, assessedValue: 425000, taxAmount: 6375, status: "Paid", taxDueDate: "2024-11-30" },
      { year: 2023, assessedValue: 400000, taxAmount: 6000, status: "Paid", taxDueDate: "2023-11-30" },
      { year: 2022, assessedValue: 380000, taxAmount: 5700, status: "Paid", taxDueDate: "2022-11-30" },
      { year: 2021, assessedValue: 360000, taxAmount: 5400, status: "Paid", taxDueDate: "2021-11-30" }
    ],
    floodZone: {
      zone: "Zone X (Minimal Risk)",
      rating: "Low",
      femaMapNumber: "17083C0210E",
      elevation: "590 ft AMSL",
      baseFloodElevation: "N/A",
      insuranceRequired: false
    },
    zoning: {
      code: "R-1",
      description: "Low-Density Single-Family Residential",
      maxHeight: "35 ft",
      setbackFront: "25 ft",
      setbackRear: "20 ft",
      floorAreaRatio: "0.45",
      complianceStatus: "Compliant"
    },
    permits: [
      { id: "PER-2023-88", date: "2023-04-12", description: "Solar Panel Installation & Electrical Upgrade", status: "Closed & Inspected", department: "Dept of Building Safety" },
      { id: "PER-2018-12", date: "2018-09-05", description: "Roof Replacement (Architectural Shingles)", status: "Closed", department: "Dept of Building Safety" }
    ],
    environmental: {
      epaSuperfundNearby: false,
      undergroundStorageTanks: "None detected within 1.5 miles",
      radonRiskLevel: "Low (Zone 3)",
      asbestosAssessment: "Cleared (Renovated post-1990)"
    },
    utilities: {
      water: "Springfield Municipal Water Authority",
      sewer: "Connected - City Sanitary Sewer",
      electricity: "Springfield Nuclear & Electric Co.",
      gas: "NiSource Gas - Connected"
    },
    riskBreakdown: {
      legal: { score: 10, status: "Pass", notes: "Clean title deed, no recorded liens or pending litigation." },
      tax: { score: 5, status: "Pass", notes: "All property taxes fully paid up to date." },
      flood: { score: 15, status: "Pass", notes: "FEMA Zone X - Minimal risk of 100-yr flooding." },
      permits: { score: 20, status: "Pass", notes: "All past permits properly closed out with city inspectors." },
      zoning: { score: 10, status: "Pass", notes: "Structure fully complies with R-1 setbacks and height restrictions." }
    },
    comparables: [
      { address: "740 Evergreen Terrace", distance: "0.05 mi", price: "$492,000", sqft: 2500, pricePerSqft: 196, soldDate: "2025-01-10" },
      { address: "748 Evergreen Terrace", distance: "0.08 mi", price: "$470,000", sqft: 2300, pricePerSqft: 204, soldDate: "2024-11-18" },
      { address: "812 Oak Street", distance: "0.30 mi", price: "$510,000", sqft: 2600, pricePerSqft: 196, soldDate: "2024-12-02" }
    ]
  },
  {
    id: "PROP-202",
    address: "100 Wall Street, Suite 400, New York, NY 10005",
    shortName: "Financial District Office Tower",
    type: "Commercial Office Building",
    price: "$14,800,000",
    sqft: "32,000 sq ft",
    yearBuilt: 2008,
    status: "Review Pending",
    riskLevel: "Moderate",
    compositeRiskScore: 42,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    owner: {
      name: "Wall Street Commercial Holdings LLC",
      deedType: "Special Warranty Deed",
      purchaseDate: "2015-08-20",
      chainOfCustody: [
        { year: "2015 - Present", owner: "Wall Street Commercial Holdings LLC", transferType: "Corporate Acquisition", price: "$12,400,000" },
        { year: "2008 - 2015", owner: "Manhattan Metro Real Estate REIT", transferType: "Original Construction Sale", price: "$9,800,000" }
      ],
      liens: [{ type: "Mechanics Lien", claimant: "Empire HVAC Services", amount: "$38,500", filedDate: "2024-10-14", status: "Under Dispute" }],
      mortgageStatus: "Active Commercial Mortgage - JPMorgan Chase ($8,200,000 balance)"
    },
    taxHistory: [
      { year: 2025, assessedValue: 14000000, taxAmount: 392000, status: "Paid", taxDueDate: "2025-07-01" },
      { year: 2024, assessedValue: 13500000, taxAmount: 378000, status: "Paid", taxDueDate: "2024-07-01" },
      { year: 2023, assessedValue: 12800000, taxAmount: 358400, status: "Paid", taxDueDate: "2023-07-01" },
      { year: 2022, assessedValue: 12000000, taxAmount: 336000, status: "Paid", taxDueDate: "2022-07-01" },
      { year: 2021, assessedValue: 11500000, taxAmount: 322000, status: "Paid", taxDueDate: "2021-07-01" }
    ],
    floodZone: {
      zone: "Zone AE (100-Year Floodplain)",
      rating: "Moderate-High",
      femaMapNumber: "36061C0201F",
      elevation: "11 ft AMSL",
      baseFloodElevation: "12 ft AMSL",
      insuranceRequired: true
    },
    zoning: {
      code: "C5-5",
      description: "High-Density Central Commercial District",
      maxHeight: "Unlimited (FAR constrained)",
      setbackFront: "0 ft (Commercial Line)",
      setbackRear: "20 ft above 23 ft height",
      floorAreaRatio: "15.0",
      complianceStatus: "Variance Required for Rooftop HVAC Expansion"
    },
    permits: [
      { id: "PER-NYC-2024-09", date: "2024-03-10", description: "Exterior Facade Inspection (Local Law 11)", status: "Completed", department: "NYC Dept of Buildings" },
      { id: "PER-NYC-2024-44", date: "2024-08-15", description: "Rooftop Cooling Tower Replacement", status: "Pending Final Sign-Off", department: "NYC Dept of Buildings" }
    ],
    environmental: {
      epaSuperfundNearby: false,
      undergroundStorageTanks: "Emergency Generator Fuel Tank (500 gal, Inspected 2024)",
      radonRiskLevel: "Negligible",
      asbestosAssessment: "Phase I ESA Completed (No Hazardous Materials)"
    },
    utilities: {
      water: "NYC Dept of Environmental Protection",
      sewer: "Combined Storm & Sanitary Sewer",
      electricity: "ConEdison High-Voltage Commercial Grid",
      gas: "National Grid - Commercial Line"
    },
    riskBreakdown: {
      legal: { score: 45, status: "Warning", notes: "$38,500 active mechanics lien under legal dispute." },
      tax: { score: 10, status: "Pass", notes: "NYC commercial property taxes fully current." },
      flood: { score: 55, status: "Warning", notes: "FEMA Zone AE requires flood insurance & barrier installation." },
      permits: { score: 35, status: "Warning", notes: "Rooftop cooling tower permit pending final inspector sign-off." },
      zoning: { score: 30, status: "Pass", notes: "Commercial C5-5 high-density zoning fully permitted." }
    },
    comparables: [
      { address: "110 Wall Street", distance: "0.03 mi", price: "$15,200,000", sqft: 31500, pricePerSqft: 482, soldDate: "2024-12-15" },
      { address: "88 Pine Street", distance: "0.12 mi", price: "$13,900,000", sqft: 30000, pricePerSqft: 463, soldDate: "2024-10-01" },
      { address: "120 Broadway", distance: "0.25 mi", price: "$16,100,000", sqft: 34000, pricePerSqft: 473, soldDate: "2025-01-20" }
    ]
  },
  {
    id: "PROP-303",
    address: "450 Ocean Drive, Miami Beach, FL 33139",
    shortName: "South Beach Waterfront Property",
    type: "Mixed-Use / Hospitality",
    price: "$8,950,000",
    sqft: "14,200 sq ft",
    yearBuilt: 1938, // Historic Art Deco
    status: "High Risk Flag",
    riskLevel: "High",
    compositeRiskScore: 78,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    owner: {
      name: "Ocean View Hospitality Ventures LLC",
      deedType: "Quitclaim Deed",
      purchaseDate: "2021-11-04",
      chainOfCustody: [
        { year: "2021 - Present", owner: "Ocean View Hospitality Ventures LLC", transferType: "LLC Transfer", price: "$7,200,000" },
        { year: "2010 - 2021", owner: "Coastal Heritage Trust", transferType: "Estate Transfer", price: "$5,100,000" }
      ],
      liens: [{ type: "Code Violation Assessment", claimant: "City of Miami Beach Historic Preservation", amount: "$112,000", filedDate: "2024-05-19", status: "Active Unpaid" }],
      mortgageStatus: "Second Mortgage Lien - Ocean Bank FL ($4,100,000)"
    },
    taxHistory: [
      { year: 2025, assessedValue: 8500000, taxAmount: 170000, status: "Overdue (30 Days)", taxDueDate: "2025-03-31" },
      { year: 2024, assessedValue: 8100000, taxAmount: 162000, status: "Paid", taxDueDate: "2024-03-31" },
      { year: 2023, assessedValue: 7600000, taxAmount: 152000, status: "Paid", taxDueDate: "2023-03-31" },
      { year: 2022, assessedValue: 7000000, taxAmount: 140000, status: "Paid", taxDueDate: "2022-03-31" },
      { year: 2021, assessedValue: 6500000, taxAmount: 130000, status: "Paid", taxDueDate: "2021-03-31" }
    ],
    floodZone: {
      zone: "Zone VE (Coastal High Hazard Area)",
      rating: "Critical High Risk",
      femaMapNumber: "12086C0315J",
      elevation: "5 ft AMSL",
      baseFloodElevation: "13 ft AMSL",
      insuranceRequired: true
    },
    zoning: {
      code: "MXE",
      description: "Mixed-Use Entertainment & Historic District",
      maxHeight: "50 ft (Historic Restriction)",
      setbackFront: "15 ft",
      setbackRear: "10 ft",
      floorAreaRatio: "2.0",
      complianceStatus: "Non-Compliant - Unpermitted Facade Modification on Historic Structure"
    },
    permits: [
      { id: "PER-MB-2022-901", date: "2022-06-18", description: "Outdoor Seating Deck Extension", status: "EXPIRED & UNINSPECTED", department: "Miami Beach Code Enforcement" }
    ],
    environmental: {
      epaSuperfundNearby: false,
      undergroundStorageTanks: "None",
      radonRiskLevel: "Low",
      asbestosAssessment: "High Risk - 1938 Construction (Full Remediation Required)"
    },
    utilities: {
      water: "City of Miami Beach Utility",
      sewer: "Coastal Pump Station Connection",
      electricity: "Florida Power & Light (FPL)",
      gas: "Propane Tank Network"
    },
    riskBreakdown: {
      legal: { score: 85, status: "Critical", notes: "Unpaid $112k Historic Preservation fine & Quitclaim deed title gap." },
      tax: { score: 70, status: "High", notes: "2025 property tax payment of $170,000 is currently overdue." },
      flood: { score: 95, status: "Critical", notes: "FEMA Zone VE coastal hazard zone (Wave velocity risk & sea level exposure)." },
      permits: { score: 80, status: "High", notes: "Uninspected expired deck permit with pending city fine." },
      zoning: { score: 60, status: "Warning", notes: "Historic Preservation Board code violation for unauthorized Art Deco alteration." }
    },
    comparables: [
      { address: "420 Ocean Drive", distance: "0.04 mi", price: "$9,400,000", sqft: 15000, pricePerSqft: 626, soldDate: "2024-09-12" },
      { address: "510 Ocean Drive", distance: "0.09 mi", price: "$8,500,000", sqft: 13500, pricePerSqft: 629, soldDate: "2024-07-22" }
    ]
  },
  {
    id: "PROP-404",
    address: "1800 Industrial Parkway, Austin, TX 78744",
    shortName: "Austin Logistics & Distribution Hub",
    type: "Industrial Warehouse",
    price: "$6,200,000",
    sqft: "45,000 sq ft",
    yearBuilt: 2017,
    status: "Verified",
    riskLevel: "Low-Moderate",
    compositeRiskScore: 26,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    owner: {
      name: "Lone Star Industrial Logistics REIT",
      deedType: "Special Warranty Deed",
      purchaseDate: "2017-03-14",
      chainOfCustody: [
        { year: "2017 - Present", owner: "Lone Star Industrial Logistics REIT", transferType: "Developer Sale", price: "$4,800,000" }
      ],
      liens: [],
      mortgageStatus: "Commercial Debt Fully Satisfied (Unencumbered Title)"
    },
    taxHistory: [
      { year: 2025, assessedValue: 6000000, taxAmount: 114000, status: "Paid", taxDueDate: "2025-01-31" },
      { year: 2024, assessedValue: 5700000, taxAmount: 108300, status: "Paid", taxDueDate: "2024-01-31" },
      { year: 2023, assessedValue: 5300000, taxAmount: 100700, status: "Paid", taxDueDate: "2023-01-31" }
    ],
    floodZone: {
      zone: "Zone X (Shaded - 0.2% Annual Chance)",
      rating: "Low",
      femaMapNumber: "48453C0635H",
      elevation: "510 ft AMSL",
      baseFloodElevation: "N/A",
      insuranceRequired: false
    },
    zoning: {
      code: "LI-PDA",
      description: "Limited Industrial - Planned Development Area",
      maxHeight: "60 ft",
      setbackFront: "50 ft",
      setbackRear: "30 ft",
      floorAreaRatio: "1.0",
      complianceStatus: "Compliant"
    },
    permits: [
      { id: "PER-ATX-2023-11", date: "2023-01-14", description: "Heavy Electric Vehicle Charging Station Yard", status: "Closed", department: "Austin Development Services" }
    ],
    environmental: {
      epaSuperfundNearby: false,
      undergroundStorageTanks: "Phase II ESA Clean - No leaks detected",
      radonRiskLevel: "Low",
      asbestosAssessment: "None (Built 2017)"
    },
    utilities: {
      water: "Austin Water Utility",
      sewer: "City Industrial Sewer Line",
      electricity: "Austin Energy 3-Phase Industrial Power",
      gas: "Texas Gas Service"
    },
    riskBreakdown: {
      legal: { score: 10, status: "Pass", notes: "Title is completely unencumbered with zero active debt or liens." },
      tax: { score: 10, status: "Pass", notes: "Travis County property taxes paid in full." },
      flood: { score: 20, status: "Pass", notes: "Zone X Minimal flood vulnerability." },
      permits: { score: 15, status: "Pass", notes: "EV Charging permit inspected and closed out cleanly." },
      zoning: { score: 10, status: "Pass", notes: "LI-PDA industrial zoning permits heavy logistics operations." }
    },
    comparables: [
      { address: "1850 Industrial Pkwy", distance: "0.10 mi", price: "$6,400,000", sqft: 46000, pricePerSqft: 139, soldDate: "2025-01-05" },
      { address: "2100 Logistics Way", distance: "0.45 mi", price: "$5,900,000", sqft: 42000, pricePerSqft: 140, soldDate: "2024-11-29" }
    ]
  }
];

export const USER_ROLES = [
  { id: "buyer", name: "Buyer / Investor", badge: "Buyer Access", permissions: ["View Properties", "Perform Searches", "Generate Reports", "View Comps"] },
  { id: "agent", name: "Real Estate Agent", badge: "Agent Access", permissions: ["View Properties", "Search", "Generate Reports", "Export Excel", "Comparable Analysis"] },
  { id: "legal", name: "Legal Reviewer", badge: "Legal Specialist", permissions: ["Title Audit", "Lien Inspection", "Zoning Compliance", "Risk Override", "Legal Export"] },
  { id: "bank", name: "Financial Institution", badge: "Lender / Bank", permissions: ["Valuation Audit", "Tax History", "Lien Verification", "Risk Score Underwriting"] },
  { id: "admin", name: "Administrator", badge: "System Admin", permissions: ["Full System Access", "User Management", "API Gateway Config", "Audit Logs", "System Override"] }
];
