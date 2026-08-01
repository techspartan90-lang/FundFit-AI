import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.fundfit.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const mockDashboardAnalytics = async () => {
  return {
    revenue: '$1,248,500',
    revenueGrowth: '+18.4%',
    activeUsers: '42,890',
    userGrowth: '+12.6%',
    fitScoreAvg: 94.2,
    fitScoreChange: '+3.1%',
    processedPortfolios: '12,450',
    charts: {
      revenueData: [
        { month: 'Jan', revenue: 65000, target: 60000, users: 2400 },
        { month: 'Feb', revenue: 78000, target: 70000, users: 3100 },
        { month: 'Mar', revenue: 92000, target: 80000, users: 4200 },
        { month: 'Apr', revenue: 88000, target: 85000, users: 4800 },
        { month: 'May', revenue: 110000, target: 95000, users: 5900 },
        { month: 'Jun', revenue: 135000, target: 110000, users: 7100 },
        { month: 'Jul', revenue: 148500, target: 125000, users: 8400 },
      ],
      allocationData: [
        { name: 'Large Cap Equity', value: 42, color: '#2563EB' },
        { name: 'Mid Cap Growth', value: 28, color: '#10B981' },
        { name: 'Global Tech', value: 18, color: '#F59E0B' },
        { name: 'Govt Securities', value: 12, color: '#8B5CF6' }
      ]
    }
  };
};
