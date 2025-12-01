export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#ef4444', icon: '🍔' },
  { id: 'transport', label: 'Transportation', color: '#3b82f6', icon: '🚗' },
  { id: 'shopping', label: 'Shopping', color: '#8b5cf6', icon: '🛍️' },
  { id: 'entertainment', label: 'Entertainment', color: '#ec4899', icon: '🎬' },
  { id: 'bills', label: 'Bills & Utilities', color: '#f59e0b', icon: '💡' },
  { id: 'healthcare', label: 'Healthcare', color: '#10b981', icon: '⚕️' },
  { id: 'education', label: 'Education', color: '#06b6d4', icon: '📚' },
  { id: 'other', label: 'Other', color: '#6b7280', icon: '📦' },
];

export const getCategoryById = (id) => {
  return EXPENSE_CATEGORIES.find(cat => cat.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
};

export const getCategoryColor = (id) => {
  return getCategoryById(id).color;
};

export const getCategoryIcon = (id) => {
  return getCategoryById(id).icon;
};