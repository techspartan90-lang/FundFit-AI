export interface StartupProfile {
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  targetRaise: number; // in USD
  raisedSoFar: number;
  valPreMoney: number;
  arr: number; // Annual Recurring Revenue in USD
  mrr: number;
  momGrowth: number; // percentage
  runwayMonths: number;
  burnRateMonthly: number;
  teamSize: number;
  founders: { name: string; role: string; background: string }[];
  fundabilityScore: number;
  scoreBreakdown: {
    team: number;
    market: number;
    product: number;
    financials: number;
    valuation: number;
  };
}

export interface PitchSlide {
  id: number;
  title: string;
  type: string;
  score: number; // 0 - 100
  status: 'excellent' | 'good' | 'needs_work' | 'warning';
  summary: string;
  strengths: string[];
  improvements: string[];
  vcRedFlags: string[];
}

export interface VCInvestor {
  id: string;
  name: string;
  firm: string;
  logoUrl?: string;
  type: 'Tier-1 VC' | 'Micro VC' | 'Super Angel' | 'Syndicate Lead' | 'Corporate VC';
  sectors: string[];
  stages: string[];
  checkSizeMin: number; // e.g. 250000
  checkSizeMax: number; // e.g. 2000000
  matchScore: number; // 0 - 100
  location: string;
  dryPowder: string;
  notableInvestments: string[];
  thesisAlignmentReason: string;
  warmPath: string; // e.g., "Mutual connection via Ex-YCombinator founder"
  recentDealCount: number;
}

export interface PipelineItem {
  id: string;
  investorId: string;
  firm: string;
  contactName: string;
  stage: 'Identified' | 'Intro Requested' | 'First Meeting' | 'Due Diligence' | 'Term Sheet' | 'Closed Pass';
  lastActivity: string;
  nextStep: string;
  dealSize: number;
  probability: number;
  notes: string;
}

export interface VCQuestionPrediction {
  category: string;
  question: string;
  difficulty: 'Hard' | 'Extreme' | 'Medium';
  whyTheyAsk: string;
  recommendedAnswer: string;
  pitfallsToAvoid: string;
}

// Initial Mock Startup Data
export const INITIAL_STARTUP: StartupProfile = {
  name: "Fundfit AI",
  tagline: "Autonomous AI Agent for Startup Fundraising & Investor Matchmaking",
  sector: "AI & Fintech SaaS",
  stage: "Seed",
  targetRaise: 2500000,
  raisedSoFar: 650000,
  valPreMoney: 10000000,
  arr: 480000,
  mrr: 40000,
  momGrowth: 22,
  runwayMonths: 14,
  burnRateMonthly: 35000,
  teamSize: 7,
  founders: [
    { name: "Aria Vance", role: "CEO & Co-founder", background: "Ex-Stripe Product Lead, 2x Founder" },
    { name: "Devon Chen", role: "CTO & Co-founder", background: "Ex-DeepMind Research Scientist, Stanford CS" }
  ],
  fundabilityScore: 86,
  scoreBreakdown: {
    team: 92,
    market: 88,
    product: 85,
    financials: 81,
    valuation: 84
  }
};

// Initial Pitch Deck Audit Slides
export const PITCH_DECK_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: "Title & Hook",
    type: "Intro",
    score: 94,
    status: "excellent",
    summary: "Clear value proposition and punchy mission statement.",
    strengths: ["Strong positioning statement", "Modern branding & crisp taglines"],
    improvements: ["Highlight current MRR metric directly on slide"],
    vcRedFlags: []
  },
  {
    id: 2,
    title: "The Problem",
    type: "Problem",
    score: 90,
    status: "excellent",
    summary: "High friction in founder fundraising - 300+ cold emails with <2% conversion.",
    strengths: ["Quantified founder pain points", "Relatable quote snippets"],
    improvements: ["Add investor side pain point (deal noise & filtering load)"],
    vcRedFlags: []
  },
  {
    id: 3,
    title: "The AI Solution",
    type: "Solution",
    score: 88,
    status: "good",
    summary: "Autonomous matchmaker + live pitch auditor reducing seed cycle from 6 months to 3 weeks.",
    strengths: ["Visual product workflow", "Clear efficiency comparison"],
    improvements: ["Include customer testimonial or metric on time saved"],
    vcRedFlags: []
  },
  {
    id: 4,
    title: "Market Opportunity (TAM/SAM/SOM)",
    type: "Market",
    score: 72,
    status: "needs_work",
    summary: "TAM estimated at $18B global private capital market software tooling.",
    strengths: ["Top-down research cited"],
    improvements: ["Provide bottom-up sizing based on 50k startups x $10k/yr ARR", "Separate VC software market from Founder market"],
    vcRedFlags: ["TAM calculation is slightly top-down heavy. VCs prefer bottom-up ARR potential."]
  },
  {
    id: 5,
    title: "Traction & Revenue Growth",
    type: "Traction",
    score: 95,
    status: "excellent",
    summary: "22% MoM growth, $480K ARR with 140 paying active accounts.",
    strengths: ["Clean growth chart curve", "Strong NRR (Net Retention Rate) of 118%"],
    improvements: ["Show CAC vs LTV payback period metric"],
    vcRedFlags: []
  },
  {
    id: 6,
    title: "Business Model & Unit Economics",
    type: "Financials",
    score: 84,
    status: "good",
    summary: "Tiered SaaS Subscription ($299-$999/mo) + 1% Success Fee option.",
    strengths: ["High gross margins (88%)", "Clear tier differentiation"],
    improvements: ["Clarify compliance/legal structure around success fees"],
    vcRedFlags: ["Success fee models can sometimes trigger regulatory broker-dealer scrutiny in certain jurisdictions."]
  },
  {
    id: 7,
    title: "Competitive Landscape",
    type: "Competition",
    score: 78,
    status: "needs_work",
    summary: "Comparison vs PitchBook, DocSend, and legacy broker databases.",
    strengths: ["2x2 matrix emphasizing AI automation and Real-time Matchmaking"],
    improvements: ["Avoid putting legacy incumbents in the bottom left without acknowledging their data moats"],
    vcRedFlags: ["Be ready to defend against 'What if PitchBook builds this?'"]
  },
  {
    id: 8,
    title: "The Team",
    type: "Team",
    score: 96,
    status: "excellent",
    summary: "Proven technical and domain expertise from Stripe and DeepMind.",
    strengths: ["Prior exit experience", "Deep ML expertise in-house"],
    improvements: ["Mention advisory board members"],
    vcRedFlags: []
  },
  {
    id: 9,
    title: "The Ask & Use of Funds",
    type: "Financials",
    score: 85,
    status: "good",
    summary: "Raising $2.5M Seed at $10M Pre-money to scale engineering & GTM.",
    strengths: ["Milestone-based budget allocation (18-month runway to $2.5M ARR)"],
    improvements: ["Break down hiring plan per role"],
    vcRedFlags: []
  }
];

// Predicted VC Questions
export const PREDICTED_VC_QUESTIONS: VCQuestionPrediction[] = [
  {
    category: "Moat & Defensability",
    question: "How do you protect your investor match data from being copied by open databases or LinkedIn API scrapers?",
    difficulty: "Hard",
    whyTheyAsk: "VCs want to ensure you are building a proprietary data engine or network effect rather than a thin wrapper over public lists.",
    recommendedAnswer: "Our moat lies in our two-sided proprietary feedback loop: every warm intro and deal evaluation refines our embeddings. Additionally, we track real-time dry powder deployability and active thesis changes that public lists cannot see.",
    pitfallsToAvoid: "Don't just answer 'Our algorithms are proprietary'. Focus on data flywheel and network velocity."
  },
  {
    category: "Unit Economics",
    question: "What is your current Customer Acquisition Cost (CAC) and how are founders finding you?",
    difficulty: "Medium",
    whyTheyAsk: "Testing if your revenue growth is organic or reliant on high paid ad spend.",
    recommendedAnswer: "Currently, 68% of new founder signups come through organic word-of-mouth and accelerator partnerships (YC, Techstars alumni network). Our CAC is $320 against a $4,200 LTV.",
    pitfallsToAvoid: "Avoid vague estimates. Use exact historical cohort numbers."
  },
  {
    category: "Valuation & Cap Table",
    question: "Why is a $10M pre-money valuation justified at $480k ARR?",
    difficulty: "Extreme",
    whyTheyAsk: "Testing your market awareness, negotiation firmness, and growth trajectory confidence.",
    recommendedAnswer: "At 22% MoM growth, we are pacing to surpass $1.2M ARR in under 6 months. Comp Seed AI deals in Fintech/SaaS with prior exit founders are pricing between 20-25x forward ARR.",
    pitfallsToAvoid: "Don't sound defensive. Anchor on forward growth milestones and team track record."
  }
];

// Database of VC Investors
export const VC_DATABASE: VCInvestor[] = [
  {
    id: "vc-1",
    name: "Elena Rostova",
    firm: "Apex Horizon Ventures",
    type: "Tier-1 VC",
    sectors: ["AI & Fintech SaaS", "Developer Tools", "B2B SaaS"],
    stages: ["Seed", "Series A"],
    checkSizeMin: 1000000,
    checkSizeMax: 3500000,
    matchScore: 97,
    location: "San Francisco, CA / London",
    dryPowder: "$120M active fund (Fund III)",
    notableInvestments: ["Ramp", "Substack", "Scale AI"],
    thesisAlignmentReason: "Actively seeking AI-first productivity workflows in financial infrastructure. Led 3 Seed deals in AI SaaS this quarter.",
    warmPath: "Connected via YC Alumni Founder (Alex Rivera, CEO of FinFlow)",
    recentDealCount: 6
  },
  {
    id: "vc-2",
    name: "Marcus Vance",
    firm: "Velocitas Capital",
    type: "Micro VC",
    sectors: ["AI & Fintech SaaS", "Marketplaces", "Creator Economy"],
    stages: ["Pre-seed", "Seed"],
    checkSizeMin: 250000,
    checkSizeMax: 1000000,
    matchScore: 94,
    location: "New York, NY",
    dryPowder: "$45M Fund II",
    notableInvestments: ["Carta", "AngelList", "Mercury"],
    thesisAlignmentReason: "Specializes in founder-facing capital tooling. Marcus published an essay on 'The Future of AI Syndication' last month.",
    warmPath: "2nd degree connection on LinkedIn via Ex-Stripe colleague",
    recentDealCount: 8
  },
  {
    id: "vc-3",
    name: "Dr. Sarah Thorne",
    firm: "Quantum Capital Angels",
    type: "Super Angel",
    sectors: ["AI & Fintech SaaS", "DeepTech", "Enterprise Software"],
    stages: ["Seed"],
    checkSizeMin: 100000,
    checkSizeMax: 500000,
    matchScore: 89,
    location: "Boston, MA",
    dryPowder: "Personal Syndicate ($15M annual deployable)",
    notableInvestments: ["DataRobot", "Figma", "Brex"],
    thesisAlignmentReason: "Former VP Engineering at Stripe. Focuses heavily on technical co-founders with strong AI/ML backgrounds.",
    warmPath: "Direct email match verified by Fundfit AI Engine",
    recentDealCount: 12
  },
  {
    id: "vc-4",
    name: "Gautam Mehta",
    firm: "Sequoia Surge / Innovation Catalyst",
    type: "Tier-1 VC",
    sectors: ["AI & Fintech SaaS", "Fintech Infrastructure"],
    stages: ["Seed", "Series A"],
    checkSizeMin: 1500000,
    checkSizeMax: 5000000,
    matchScore: 85,
    location: "Palo Alto, CA / Singapore",
    dryPowder: "$300M Global Seed Fund",
    notableInvestments: ["Stripe", "Plaid", "Deel"],
    thesisAlignmentReason: "High interest in cross-border founder platform services and automated compliance deal flow.",
    warmPath: "Warm intro path through Stanford Alumni Network",
    recentDealCount: 10
  },
  {
    id: "vc-5",
    name: "Claire Lin",
    firm: "Bessemer Next Generation Fund",
    type: "Tier-1 VC",
    sectors: ["AI & Fintech SaaS", "Cloud Software"],
    stages: ["Seed", "Series A"],
    checkSizeMin: 1000000,
    checkSizeMax: 4000000,
    matchScore: 82,
    location: "San Francisco, CA",
    dryPowder: "$250M Early Stage",
    notableInvestments: ["Toast", "Shopify", "Zapier"],
    thesisAlignmentReason: "Bessemer's AI Memos explicitly highlight autonomous agent platforms for professional service automation.",
    warmPath: "Mutual intro via portfolio CEO",
    recentDealCount: 5
  }
];

// Initial Pipeline Data
export const INITIAL_PIPELINE: PipelineItem[] = [
  {
    id: "pipe-1",
    investorId: "vc-1",
    firm: "Apex Horizon Ventures",
    contactName: "Elena Rostova",
    stage: "Due Diligence",
    lastActivity: "Yesterday",
    nextStep: "Technical Deep-dive with CTO & Data room access",
    dealSize: 1500000,
    probability: 75,
    notes: "Very bullish on our MoM ARR growth curve. Asked for customer retention cohort analysis."
  },
  {
    id: "pipe-2",
    investorId: "vc-2",
    firm: "Velocitas Capital",
    contactName: "Marcus Vance",
    stage: "First Meeting",
    lastActivity: "2 days ago",
    nextStep: "Follow-up call on cap table terms",
    dealSize: 500000,
    probability: 60,
    notes: "Intro call went great. Marcus loved the AI Deck Auditor feature demo."
  },
  {
    id: "pipe-3",
    investorId: "vc-3",
    firm: "Quantum Capital Angels",
    contactName: "Dr. Sarah Thorne",
    stage: "Term Sheet",
    lastActivity: "Today",
    nextStep: "Review term sheet draft ($250k check at $10M Pre)",
    dealSize: 250000,
    probability: 90,
    notes: "Issued soft term sheet commitment! Wants to lead $250k angel slice."
  },
  {
    id: "pipe-4",
    investorId: "vc-4",
    firm: "Sequoia Surge / Innovation Catalyst",
    contactName: "Gautam Mehta",
    stage: "Intro Requested",
    lastActivity: "3 days ago",
    nextStep: "Awaiting warm forward from Alex Rivera",
    dealSize: 1000000,
    probability: 30,
    notes: "Sent forwardable blurb to Alex. Waiting for confirmation."
  }
];
