
export const mockCompanyData = [
  {
    id: "1",
    name: "Tata Consultancy Services",
    ticker: "TCS.NS",
    price: 3850.25,
    change: 72.30,
    changePercent: 1.92,
    currency: "INR",
    market: "NSE",
    sector: "Technology",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    description: "Tata Consultancy Services Limited is an Indian multinational information technology services and consulting company headquartered in Mumbai, Maharashtra, India. It is a part of the Tata Group and operates in 149 locations across 46 countries.",
    marketCap: 14082000000000, // 14.08 trillion INR
    eps: 120.34,
    revenue: 2259100000000, // 2.26 trillion INR
    netIncome: 429010000000, // 429 billion INR
    peRatio: 31.99,
    dividendYield: 1.32,
    yearFounded: 1968,
    employees: 613974,
    ceo: "K Krithivasan",
    headquarters: "Mumbai, India",
    stockChartData: [
      { date: "Jan", price: 3520.45, volume: 4520000 },
      { date: "Feb", price: 3580.10, volume: 4850000 },
      { date: "Mar", price: 3495.75, volume: 5120000 },
      { date: "Apr", price: 3610.20, volume: 4780000 },
      { date: "May", price: 3690.50, volume: 5350000 },
      { date: "Jun", price: 3750.15, volume: 5050000 },
      { date: "Jul", price: 3790.80, volume: 4870000 },
      { date: "Aug", price: 3850.25, volume: 5240000 }
    ],
    keyMetrics: [
      {
        title: "Q1 Revenue",
        value: "₹59,381 Cr",
        change: 5.2,
        changePercentage: 3.7
      },
      {
        title: "Operating Margin",
        value: "23.2%",
        change: -0.8,
        changePercentage: -3.3
      },
      {
        title: "Deal Value",
        value: "₹27,500 Cr",
        change: 9.7,
        changePercentage: 16.4
      },
      {
        title: "Digital Revenue",
        value: "45.3%",
        change: 4.1,
        changePercentage: 9.9
      }
    ]
  },
  {
    id: "2",
    name: "HDFC Bank",
    ticker: "HDFCBANK.NS",
    price: 1650.80,
    change: 15.45,
    changePercent: 0.94,
    currency: "INR",
    market: "NSE",
    sector: "Finance",
    sentiment: "neutral" as "positive" | "neutral" | "negative",
    description: "HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai, Maharashtra. It is India's largest private sector bank by assets and the world's 10th largest bank by market capitalization as of April 2021.",
    marketCap: 9120000000000, // 9.12 trillion INR
    eps: 82.5,
    revenue: 1574000000000, // 1.57 trillion INR
    netIncome: 44786000000, // 447.86 billion INR
    peRatio: 20.01,
    dividendYield: 0.85,
    yearFounded: 1994,
    employees: 141579,
    ceo: "Sashidhar Jagdishan",
    headquarters: "Mumbai, India",
    stockChartData: [
      { date: "Jan", price: 1520.15, volume: 8720000 },
      { date: "Feb", price: 1540.80, volume: 9150000 },
      { date: "Mar", price: 1510.45, volume: 8950000 },
      { date: "Apr", price: 1580.60, volume: 9320000 },
      { date: "May", price: 1610.75, volume: 9750000 },
      { date: "Jun", price: 1620.30, volume: 9430000 },
      { date: "Jul", price: 1645.20, volume: 9680000 },
      { date: "Aug", price: 1650.80, volume: 9540000 }
    ],
    keyMetrics: [
      {
        title: "Net Interest Margin",
        value: "4.1%",
        change: 0.2,
        changePercentage: 5.1
      },
      {
        title: "CASA Ratio",
        value: "45.8%",
        change: 1.3,
        changePercentage: 2.9
      },
      {
        title: "Gross NPA",
        value: "1.17%",
        change: -0.23,
        changePercentage: -16.4
      },
      {
        title: "CAR",
        value: "18.9%",
        change: 0.7,
        changePercentage: 3.8
      }
    ]
  }
];

export const mockCompetitorsData = [
  {
    companyId: "1", // TCS
    companyName: "Tata Consultancy Services",
    competitors: [
      {
        id: "1",
        name: "TCS",
        marketCap: 14082000000000,
        revenue: 2259100000000,
        netIncome: 429010000000,
        eps: 120.34,
        peRatio: 31.99,
        priceToSales: 6.23,
        debtToEquity: 0.04,
        operatingMargin: 0.25,
        color: "#2563eb"
      },
      {
        id: "infosys",
        name: "Infosys",
        marketCap: 7250000000000,
        revenue: 1419700000000,
        netIncome: 248100000000,
        eps: 59.03,
        peRatio: 29.48,
        priceToSales: 5.11,
        debtToEquity: 0.07,
        operatingMargin: 0.24,
        color: "#ef4444"
      },
      {
        id: "wipro",
        name: "Wipro",
        marketCap: 2560000000000,
        revenue: 889600000000,
        netIncome: 135300000000,
        eps: 24.71,
        peRatio: 20.64,
        priceToSales: 2.88,
        debtToEquity: 0.14,
        operatingMargin: 0.17,
        color: "#10b981"
      },
      {
        id: "hcl",
        name: "HCL Tech",
        marketCap: 3670000000000,
        revenue: 970700000000,
        netIncome: 165100000000,
        eps: 60.75,
        peRatio: 22.18,
        priceToSales: 3.78,
        debtToEquity: 0.11,
        operatingMargin: 0.20,
        color: "#f59e0b"
      }
    ],
    performanceChart: [
      { date: "Jan", "1": 0, "infosys": 0, "wipro": 0, "hcl": 0 },
      { date: "Feb", "1": 1.7, "infosys": 0.8, "wipro": -1.2, "hcl": 1.3 },
      { date: "Mar", "1": -0.7, "infosys": -2.1, "wipro": -3.5, "hcl": -1.8 },
      { date: "Apr", "1": 3.3, "infosys": 2.9, "wipro": 1.4, "hcl": 3.1 },
      { date: "May", "1": 5.4, "infosys": 3.7, "wipro": 2.1, "hcl": 4.2 },
      { date: "Jun", "1": 6.5, "infosys": 5.2, "wipro": 2.8, "hcl": 5.7 },
      { date: "Jul", "1": 7.7, "infosys": 6.8, "wipro": 4.2, "hcl": 6.9 },
      { date: "Aug", "1": 9.4, "infosys": 7.5, "wipro": 5.1, "hcl": 8.1 }
    ],
    revenueGrowthChart: [
      { year: "2019", "1": 11.4, "infosys": 9.8, "wipro": 7.5, "hcl": 10.1 },
      { year: "2020", "1": 7.2, "infosys": 8.3, "wipro": 4.2, "hcl": 8.6 },
      { year: "2021", "1": 4.6, "infosys": 5.8, "wipro": 1.3, "hcl": 6.7 },
      { year: "2022", "1": 16.8, "infosys": 14.2, "wipro": 12.7, "hcl": 15.2 },
      { year: "2023", "1": 11.7, "infosys": 9.8, "wipro": 7.5, "hcl": 10.1 }
    ]
  },
  {
    companyId: "2", // HDFC Bank
    companyName: "HDFC Bank",
    competitors: [
      {
        id: "2",
        name: "HDFC Bank",
        marketCap: 9120000000000,
        revenue: 1574000000000,
        netIncome: 447860000000,
        eps: 82.5,
        peRatio: 20.01,
        priceToSales: 5.79,
        debtToEquity: 7.11,
        operatingMargin: 0.43,
        color: "#2563eb"
      },
      {
        id: "icici",
        name: "ICICI Bank",
        marketCap: 7015000000000,
        revenue: 1241000000000,
        netIncome: 316600000000,
        eps: 45.75,
        peRatio: 22.5,
        priceToSales: 5.65,
        debtToEquity: 7.71,
        operatingMargin: 0.39,
        color: "#ef4444"
      },
      {
        id: "sbi",
        name: "State Bank of India",
        marketCap: 5876000000000,
        revenue: 3006000000000,
        netIncome: 501700000000,
        eps: 56.2,
        peRatio: 10.45,
        priceToSales: 1.96,
        debtToEquity: 10.42,
        operatingMargin: 0.31,
        color: "#10b981"
      },
      {
        id: "axis",
        name: "Axis Bank",
        marketCap: 3170000000000,
        revenue: 928900000000,
        netIncome: 156500000000,
        eps: 50.89,
        peRatio: 20.43,
        priceToSales: 3.41,
        debtToEquity: 8.95,
        operatingMargin: 0.32,
        color: "#f59e0b"
      }
    ],
    performanceChart: [
      { date: "Jan", "2": 0, "icici": 0, "sbi": 0, "axis": 0 },
      { date: "Feb", "2": 1.4, "icici": 2.1, "sbi": 3.4, "axis": 1.7 },
      { date: "Mar", "2": -0.5, "icici": -1.2, "sbi": -3.8, "axis": -2.5 },
      { date: "Apr", "2": 4.6, "icici": 3.9, "sbi": 5.7, "axis": 3.8 },
      { date: "May", "2": 6.3, "icici": 5.4, "sbi": 7.5, "axis": 6.1 },
      { date: "Jun", "2": 6.9, "icici": 6.1, "sbi": 8.2, "axis": 6.7 },
      { date: "Jul", "2": 8.2, "icici": 7.8, "sbi": 9.5, "axis": 7.9 },
      { date: "Aug", "2": 8.6, "icici": 8.1, "sbi": 10.2, "axis": 8.3 }
    ],
    revenueGrowthChart: [
      { year: "2019", "2": 20.3, "icici": 17.6, "sbi": 12.9, "axis": 16.4 },
      { year: "2020", "2": 18.1, "icici": 15.2, "sbi": 11.0, "axis": 14.8 },
      { year: "2021", "2": 8.6, "icici": 7.4, "sbi": 5.2, "axis": 6.9 },
      { year: "2022", "2": 14.2, "icici": 12.9, "sbi": 9.8, "axis": 11.7 },
      { year: "2023", "2": 21.5, "icici": 19.8, "sbi": 14.7, "axis": 18.3 }
    ]
  }
];

export const mockNewsData = [
  // TCS news
  {
    id: "n1",
    companyId: "1",
    title: "TCS Wins Major Cloud Transformation Deal with European Banking Giant",
    source: "Financial Times",
    date: "2025-03-29T09:30:00Z",
    excerpt: "Tata Consultancy Services has secured a multi-million dollar cloud transformation contract with one of Europe's largest banking institutions. The deal, spanning 5 years, will modernize the bank's core systems and enhance digital capabilities.",
    url: "https://example.com/news/tcs-cloud-deal",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    category: "Contracts & Deals",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n2",
    companyId: "1",
    title: "TCS Reports Strong Q3 Results, Beats Analyst Expectations",
    source: "Economic Times",
    date: "2025-03-15T14:45:00Z",
    excerpt: "Tata Consultancy Services reported a 15% year-on-year increase in quarterly profit, exceeding market expectations. Revenue grew by 18.3%, driven by digital transformation projects and growth in North American markets.",
    url: "https://example.com/news/tcs-q3-results",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    category: "Earnings",
    isEarningsRelated: true,
    isInsiderTrade: false
  },
  {
    id: "n3",
    companyId: "1",
    title: "TCS Announces Executive Reshuffle as CTO Steps Down",
    source: "Bloomberg",
    date: "2025-03-10T11:20:00Z",
    excerpt: "TCS has announced a major executive reorganization following the departure of their Chief Technology Officer. The company has promoted several internal leaders to new positions as part of its succession strategy.",
    url: "https://example.com/news/tcs-executive-changes",
    sentiment: "neutral" as "positive" | "neutral" | "negative",
    category: "Management",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n4",
    companyId: "1",
    title: "TCS Faces Increased Competition in AI Services Market",
    source: "Reuters",
    date: "2025-02-28T08:15:00Z",
    excerpt: "TCS is facing heightened competition in the AI services segment as newer, specialized firms gain market share. Analysts express concerns about pricing pressure and the impact on margins in this high-growth area.",
    url: "https://example.com/news/tcs-ai-competition",
    sentiment: "negative" as "positive" | "neutral" | "negative",
    category: "Market Analysis",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n5",
    companyId: "1",
    title: "TCS Chairman Sells Shares Worth $4.2 Million",
    source: "CNBC",
    date: "2025-02-20T13:45:00Z",
    excerpt: "The chairman of Tata Consultancy Services has sold shares worth approximately $4.2 million, according to regulatory filings. The transaction was reportedly part of a pre-planned portfolio rebalancing.",
    url: "https://example.com/news/tcs-chairman-share-sale",
    sentiment: "neutral" as "positive" | "neutral" | "negative",
    category: "Insider Trading",
    isEarningsRelated: false,
    isInsiderTrade: true
  },
  
  // HDFC Bank news
  {
    id: "n6",
    companyId: "2",
    title: "HDFC Bank Expands Rural Banking Initiative, Plans 500 New Branches",
    source: "Economic Times",
    date: "2025-03-25T10:15:00Z",
    excerpt: "HDFC Bank announced a major rural expansion initiative, with plans to open 500 new branches in underserved areas over the next 18 months. The bank aims to increase financial inclusion and capture growth in rural markets.",
    url: "https://example.com/news/hdfc-rural-expansion",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    category: "Business Strategy",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n7",
    companyId: "2",
    title: "HDFC Bank's Mobile Banking App Faces Technical Issues, Customers Report Outages",
    source: "Business Standard",
    date: "2025-03-18T16:30:00Z",
    excerpt: "HDFC Bank customers reported widespread issues with the bank's mobile application, with many unable to access accounts or complete transactions. The bank acknowledged the technical difficulties and said its IT team is working on resolving the issues.",
    url: "https://example.com/news/hdfc-app-outage",
    sentiment: "negative" as "positive" | "neutral" | "negative",
    category: "Technical Issues",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n8",
    companyId: "2",
    title: "HDFC Bank Launches AI-Based Lending Platform for SMEs",
    source: "Mint",
    date: "2025-03-12T09:45:00Z",
    excerpt: "HDFC Bank has unveiled an artificial intelligence-powered lending platform targeting small and medium enterprises. The new system promises faster loan approvals, with decisions in as little as 24 hours for qualified businesses.",
    url: "https://example.com/news/hdfc-ai-lending",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    category: "Product Launch",
    isEarningsRelated: false,
    isInsiderTrade: false
  },
  {
    id: "n9",
    companyId: "2",
    title: "HDFC Bank Reports Q4 Results with Slight Increase in NPAs",
    source: "Financial Express",
    date: "2025-03-05T14:20:00Z",
    excerpt: "HDFC Bank reported its quarterly results with a modest increase in non-performing assets. While profits grew by 12.7%, the slight deterioration in asset quality raised concerns among some analysts about the broader economic outlook.",
    url: "https://example.com/news/hdfc-q4-results",
    sentiment: "neutral" as "positive" | "neutral" | "negative",
    category: "Earnings",
    isEarningsRelated: true,
    isInsiderTrade: false
  },
  {
    id: "n10",
    companyId: "2",
    title: "HDFC Bank Secures Regulatory Approval for New Credit Card Partnership",
    source: "Reuters",
    date: "2025-02-25T11:10:00Z",
    excerpt: "HDFC Bank has received regulatory approval for its strategic partnership with a major international payment network. The collaboration is expected to enhance the bank's credit card offerings with new rewards programs and security features.",
    url: "https://example.com/news/hdfc-card-partnership",
    sentiment: "positive" as "positive" | "neutral" | "negative",
    category: "Partnerships",
    isEarningsRelated: false,
    isInsiderTrade: false
  }
];

export const mockSentimentData = [
  {
    companyId: "1", // TCS
    companyName: "Tata Consultancy Services",
    currentSentiment: "positive" as "positive" | "neutral" | "negative",
    sentimentScore: 76,
    sentimentHistory: [
      { date: "Jan", score: 68, volume: 2450 },
      { date: "Feb", score: 72, volume: 3150 },
      { date: "Mar", score: 65, volume: 2780 },
      { date: "Apr", score: 69, volume: 3050 },
      { date: "May", score: 71, volume: 3420 },
      { date: "Jun", score: 75, volume: 3710 },
      { date: "Jul", score: 73, volume: 3250 },
      { date: "Aug", score: 76, volume: 3480 }
    ],
    sentimentDistribution: [
      { name: "Positive", value: 62, color: "#10b981" },
      { name: "Neutral", value: 28, color: "#f59e0b" },
      { name: "Negative", value: 10, color: "#ef4444" }
    ],
    sentimentBySource: [
      { source: "News Articles", positive: 65, neutral: 25, negative: 10 },
      { source: "Financial Reports", positive: 70, neutral: 25, negative: 5 },
      { source: "Social Media", positive: 54, neutral: 31, negative: 15 },
      { source: "Analyst Reports", positive: 68, neutral: 22, negative: 10 }
    ],
    keyTopics: [
      { topic: "Cloud Services Growth", weight: 85, sentiment: "positive" as "positive" | "neutral" | "negative" },
      { topic: "Revenue Performance", weight: 78, sentiment: "positive" as "positive" | "neutral" | "negative" },
      { topic: "Strategic Acquisitions", weight: 72, sentiment: "positive" as "positive" | "neutral" | "negative" },
      { topic: "Executive Changes", weight: 60, sentiment: "neutral" as "positive" | "neutral" | "negative" },
      { topic: "AI Market Competition", weight: 52, sentiment: "negative" as "positive" | "neutral" | "negative" }
    ],
    sentimentSummary: "TCS is currently experiencing strong positive sentiment in the market, primarily driven by its cloud services growth and robust financial performance. Recent major contract wins have contributed significantly to investor confidence. The company's strategic acquisitions are viewed favorably, though some concerns exist regarding increased competition in the AI services space. Analyst reports generally maintain 'Buy' or 'Hold' recommendations, with expectations for continued growth in the coming quarters. Social media sentiment is mostly positive with particularly strong engagement around new product announcements and digital transformation case studies."
  },
  {
    companyId: "2", // HDFC Bank
    companyName: "HDFC Bank",
    currentSentiment: "neutral" as "positive" | "neutral" | "negative",
    sentimentScore: 61,
    sentimentHistory: [
      { date: "Jan", score: 70, volume: 3120 },
      { date: "Feb", score: 67, volume: 2950 },
      { date: "Mar", score: 63, volume: 3240 },
      { date: "Apr", score: 59, volume: 2870 },
      { date: "May", score: 55, volume: 2790 },
      { date: "Jun", score: 58, volume: 3090 },
      { date: "Jul", score: 62, volume: 3310 },
      { date: "Aug", score: 61, volume: 3150 }
    ],
    sentimentDistribution: [
      { name: "Positive", value: 45, color: "#10b981" },
      { name: "Neutral", value: 38, color: "#f59e0b" },
      { name: "Negative", value: 17, color: "#ef4444" }
    ],
    sentimentBySource: [
      { source: "News Articles", positive: 50, neutral: 32, negative: 18 },
      { source: "Financial Reports", positive: 61, neutral: 29, negative: 10 },
      { source: "Social Media", positive: 38, neutral: 42, negative: 20 },
      { source: "Analyst Reports", positive: 55, neutral: 35, negative: 10 }
    ],
    keyTopics: [
      { topic: "Rural Banking Expansion", weight: 81, sentiment: "positive" as "positive" | "neutral" | "negative" },
      { topic: "Digital Banking Initiatives", weight: 76, sentiment: "positive" as "positive" | "neutral" | "negative" },
      { topic: "Asset Quality", weight: 58, sentiment: "neutral" as "positive" | "neutral" | "negative" },
      { topic: "App Technical Issues", weight: 65, sentiment: "negative" as "positive" | "neutral" | "negative" },
      { topic: "Regulatory Compliance", weight: 62, sentiment: "neutral" as "positive" | "neutral" | "negative" }
    ],
    sentimentSummary: "HDFC Bank is currently experiencing mixed sentiment, with slightly positive overall market perception. The bank's rural expansion initiatives and digital banking innovations are viewed positively by investors and analysts. However, recent technical issues with the mobile banking application have negatively impacted customer sentiment across social media platforms. Asset quality shows some signs of pressure, though analysts generally consider this a temporary concern in line with broader economic conditions. Regulatory compliance metrics remain strong, contributing to institutional investor confidence. The bank's strategic partnerships are generating positive attention, though the market is adopting a wait-and-see approach regarding their long-term impact."
  }
];
