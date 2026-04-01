import type { Transaction } from '@/types'

export const mockTransactions: Transaction[] = [
  // === SALARY (6 entries, ₹85,000 each) ===
  { id: '1', date: '2025-11-01', description: 'Monthly Salary - November', category: 'Salary', type: 'income', amount: 85000 },
  { id: '2', date: '2025-12-01', description: 'Monthly Salary - December', category: 'Salary', type: 'income', amount: 85000 },
  { id: '3', date: '2026-01-01', description: 'Monthly Salary - January', category: 'Salary', type: 'income', amount: 85000 },
  { id: '4', date: '2026-02-01', description: 'Monthly Salary - February', category: 'Salary', type: 'income', amount: 85000 },
  { id: '5', date: '2026-03-01', description: 'Monthly Salary - March', category: 'Salary', type: 'income', amount: 85000 },
  { id: '6', date: '2026-04-01', description: 'Monthly Salary - April', category: 'Salary', type: 'income', amount: 85000 },

  // === FREELANCE (3 entries) ===
  { id: '7', date: '2025-11-15', description: 'Freelance Web Dev Project', category: 'Freelance', type: 'income', amount: 25000 },
  { id: '8', date: '2026-01-20', description: 'Freelance Logo Design', category: 'Freelance', type: 'income', amount: 15000 },
  { id: '9', date: '2026-03-10', description: 'Freelance App Consulting', category: 'Freelance', type: 'income', amount: 40000 },

  // === FOOD (10 entries) ===
  { id: '10', date: '2025-11-05', description: 'Swiggy Dinner', category: 'Food', type: 'expense', amount: 450 },
  { id: '11', date: '2025-11-18', description: 'Zepto Groceries', category: 'Food', type: 'expense', amount: 780 },
  { id: '12', date: '2025-12-03', description: 'Zomato Lunch Order', category: 'Food', type: 'expense', amount: 350 },
  { id: '13', date: '2025-12-22', description: 'BigBasket Monthly Groceries', category: 'Food', type: 'expense', amount: 650 },
  { id: '14', date: '2026-01-08', description: 'Swiggy Breakfast', category: 'Food', type: 'expense', amount: 200 },
  { id: '15', date: '2026-01-25', description: 'Zepto Groceries', category: 'Food', type: 'expense', amount: 550 },
  { id: '16', date: '2026-02-14', description: 'Valentine Dinner Out', category: 'Food', type: 'expense', amount: 800 },
  { id: '17', date: '2026-03-05', description: 'Swiggy Dinner', category: 'Food', type: 'expense', amount: 380 },
  { id: '18', date: '2026-03-20', description: 'Zepto Groceries', category: 'Food', type: 'expense', amount: 620 },
  { id: '19', date: '2026-04-01', description: 'Blinkit Quick Delivery', category: 'Food', type: 'expense', amount: 150 },

  // === TRANSPORT (8 entries) ===
  { id: '20', date: '2025-11-07', description: 'Ola Ride to Office', category: 'Transport', type: 'expense', amount: 250 },
  { id: '21', date: '2025-12-01', description: 'Metro Card Recharge', category: 'Transport', type: 'expense', amount: 500 },
  { id: '22', date: '2025-12-15', description: 'Uber Ride to Mall', category: 'Transport', type: 'expense', amount: 180 },
  { id: '23', date: '2026-01-10', description: 'Ola Ride to Office', category: 'Transport', type: 'expense', amount: 280 },
  { id: '24', date: '2026-02-05', description: 'Rapido Bike Ride', category: 'Transport', type: 'expense', amount: 80 },
  { id: '25', date: '2026-02-20', description: 'Metro Card Recharge', category: 'Transport', type: 'expense', amount: 500 },
  { id: '26', date: '2026-03-12', description: 'Ola Ride to Airport', category: 'Transport', type: 'expense', amount: 450 },
  { id: '27', date: '2026-04-01', description: 'Uber Ride to Office', category: 'Transport', type: 'expense', amount: 200 },

  // === SHOPPING (7 entries) ===
  { id: '28', date: '2025-11-11', description: 'Amazon Great Indian Sale', category: 'Shopping', type: 'expense', amount: 8000 },
  { id: '29', date: '2025-12-10', description: 'Myntra Winter Collection', category: 'Shopping', type: 'expense', amount: 3500 },
  { id: '30', date: '2025-12-25', description: 'Amazon Purchase - Headphones', category: 'Shopping', type: 'expense', amount: 2500 },
  { id: '31', date: '2026-01-15', description: 'Flipkart Republic Day Sale', category: 'Shopping', type: 'expense', amount: 5500 },
  { id: '32', date: '2026-02-10', description: 'Amazon Purchase - Books', category: 'Shopping', type: 'expense', amount: 750 },
  { id: '33', date: '2026-03-08', description: 'Myntra Spring Collection', category: 'Shopping', type: 'expense', amount: 2200 },
  { id: '34', date: '2026-03-28', description: 'Croma Electronics', category: 'Shopping', type: 'expense', amount: 4500 },

  // === BILLS (8 entries) ===
  { id: '35', date: '2025-11-10', description: 'Jio Recharge', category: 'Bills', type: 'expense', amount: 599 },
  { id: '36', date: '2025-11-20', description: 'Electricity Bill', category: 'Bills', type: 'expense', amount: 1800 },
  { id: '37', date: '2025-12-12', description: 'HDFC Credit Card Bill', category: 'Bills', type: 'expense', amount: 3000 },
  { id: '38', date: '2026-01-05', description: 'Jio Recharge', category: 'Bills', type: 'expense', amount: 599 },
  { id: '39', date: '2026-01-18', description: 'Electricity Bill', category: 'Bills', type: 'expense', amount: 2100 },
  { id: '40', date: '2026-02-15', description: 'HDFC Credit Card Bill', category: 'Bills', type: 'expense', amount: 2800 },
  { id: '41', date: '2026-03-10', description: 'Jio Recharge', category: 'Bills', type: 'expense', amount: 599 },
  { id: '42', date: '2026-03-22', description: 'Electricity Bill', category: 'Bills', type: 'expense', amount: 1950 },

  // === ENTERTAINMENT (6 entries) ===
  { id: '43', date: '2025-11-22', description: 'BookMyShow Movies', category: 'Entertainment', type: 'expense', amount: 600 },
  { id: '44', date: '2025-12-31', description: 'New Year Party Tickets', category: 'Entertainment', type: 'expense', amount: 2500 },
  { id: '45', date: '2026-01-12', description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 649 },
  { id: '46', date: '2026-02-08', description: 'BookMyShow Movies', category: 'Entertainment', type: 'expense', amount: 500 },
  { id: '47', date: '2026-03-15', description: 'Spotify Annual Plan', category: 'Entertainment', type: 'expense', amount: 1189 },
  { id: '48', date: '2026-04-01', description: 'Disney+ Hotstar', category: 'Entertainment', type: 'expense', amount: 299 },

  // === HEALTH (5 entries) ===
  { id: '49', date: '2025-11-28', description: 'Apollo Pharmacy', category: 'Health', type: 'expense', amount: 850 },
  { id: '50', date: '2025-12-08', description: 'Gym Membership', category: 'Health', type: 'expense', amount: 2000 },
  { id: '51', date: '2026-01-22', description: 'Apollo Pharmacy', category: 'Health', type: 'expense', amount: 650 },
  { id: '52', date: '2026-02-18', description: 'Full Body Health Checkup', category: 'Health', type: 'expense', amount: 2500 },
  { id: '53', date: '2026-03-25', description: 'Gym Membership Renewal', category: 'Health', type: 'expense', amount: 2000 },

  // === TRAVEL (4 entries) ===
  { id: '54', date: '2025-12-20', description: 'Goa Trip Hotels', category: 'Travel', type: 'expense', amount: 12000 },
  { id: '55', date: '2025-12-21', description: 'Goa Trip Flights', category: 'Travel', type: 'expense', amount: 8500 },
  { id: '56', date: '2026-02-28', description: 'Manali Weekend Trip', category: 'Travel', type: 'expense', amount: 9000 },
  { id: '57', date: '2026-03-18', description: 'Rishikesh Camping Trip', category: 'Travel', type: 'expense', amount: 5500 },

  // === OTHER (3 entries) ===
  { id: '58', date: '2025-11-30', description: 'Birthday Gift for Friend', category: 'Other', type: 'expense', amount: 1500 },
  { id: '59', date: '2026-01-26', description: 'Donation - Republic Day', category: 'Other', type: 'expense', amount: 1000 },
  { id: '60', date: '2026-03-30', description: 'Stationery Supplies', category: 'Other', type: 'expense', amount: 350 },
]
