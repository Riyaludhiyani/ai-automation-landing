// Multi-dimensional pricing configuration matrix
export const pricingMatrix = {
  baseRates: {
    starter: 29,
    professional: 79,
    enterprise: 199
  },
  
  currencies: {
    INR: {
      symbol: '₹',
      rate: 83.5, // 1 USD = 83.5 INR
      locale: 'en-IN'
    },
    USD: {
      symbol: '$',
      rate: 1,
      locale: 'en-US'
    },
    EUR: {
      symbol: '€',
      rate: 0.92, // 1 USD = 0.92 EUR
      locale: 'en-EU'
    }
  },
  
  regionalTariffs: {
    INR: 1.0, // No additional tariff
    USD: 1.0,
    EUR: 1.05 // 5% tariff for EU region
  },
  
  annualDiscount: 0.20, // 20% discount
  
  calculatePrice(baseRate, currency, billingCycle) {
    const currencyData = this.currencies[currency];
    const tariff = this.regionalTariffs[currency];
    
    let price = baseRate * currencyData.rate * tariff;
    
    if (billingCycle === 'annual') {
      price = price * (1 - this.annualDiscount);
    }
    
    return Math.round(price);
  },
  
  getFormattedPrice(baseRate, currency, billingCycle) {
    const price = this.calculatePrice(baseRate, currency, billingCycle);
    const symbol = this.currencies[currency].symbol;
    
    return `${symbol}${price.toLocaleString()}`;
  }
};

export const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams and startups',
    baseRate: 29,
    features: [
      'Up to 10,000 records/month',
      'Basic automation workflows',
      '5 team members',
      'Email support',
      'API access'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses with advanced needs',
    baseRate: 79,
    features: [
      'Up to 100,000 records/month',
      'Advanced automation workflows',
      '25 team members',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    baseRate: 199,
    features: [
      'Unlimited records',
      'Custom automation workflows',
      'Unlimited team members',
      '24/7 dedicated support',
      'Advanced analytics & reporting',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment option'
    ]
  }
];