export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'investor' | 'advisor';
  company?: string;
  plan?: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: string;
}

export interface Transaction {
  id: string;
  fundName: string;
  type: 'Buy' | 'Sell' | 'SIP';
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
