import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, subMonths, isWithinInterval, parseISO } from'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateForInput = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getDateRangePresets = () => {
  const today = new Date();

  return {
    thisMonth: {
      start: startOfMonth(today),
      end: endOfMonth(today),
      label: 'This Month'
    },
    lastMonth: {
      start: startOfMonth(subMonths(today, 1)),
      end: endOfMonth(subMonths(today, 1)),
      label: 'Last Month'
    },
    thisWeek: {
      start: startOfWeek(today),
      end: endOfWeek(today),
      label: 'This Week'
    },
    thisYear: {
      start: startOfYear(today),
      end: endOfYear(today),
      label: 'This Year'
    },
    all: {
      start: new Date(2000, 0, 1),
      end: new Date(2099, 11, 31),
      label: 'All Time'
    }
  };
};

export const filterByDateRange = (expenses, startDate, endDate) => {
  if (!startDate || !endDate) return expenses;

  return expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, {
      start: new Date(startDate),
      end: new Date(endDate)
    });
  });
};

export const filterByCategory = (expenses, category) => {
  if (!category || category === 'all') return expenses;
  return expenses.filter(expense => expense.category === category);
};
