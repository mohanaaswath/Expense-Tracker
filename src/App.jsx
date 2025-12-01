import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import ExpenseList from './components/ExpenseList';
import ExpenseModal from './components/ExpenseModal';
import Filters from './components/Filters';
import AnalyticsChart from './components/AnalyticsChart';
import { useExpenses } from './hooks/useExpenses';
import { useDarkMode } from './hooks/useDarkMode';
import { filterByDateRange, filterByCategory, getDateRangePresets } from './utils/dataHelpers';

function App() {
  const { expenses, loading, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isDark, toggleDarkMode] = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeTab, setActiveTab] = useState('expenses');

  const datePresets = getDateRangePresets();
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: datePresets.thisMonth.start.toISOString().split('T')[0],
    endDate: datePresets.thisMonth.end.toISOString().split('T')[0]
  });

  const filteredExpenses = useMemo(() => {
    let result = expenses;
    result = filterByCategory(result, filters.category);
    result = filterByDateRange(result, filters.startDate, filters.endDate);
    return result;
  }, [expenses, filters]);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  const handleSubmitExpense = async (expenseData) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expenseData);
    } else {
      await addExpense(expenseData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Expense Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your expenses efficiently
          </p>
        </div>

        <StatsCards expenses={filteredExpenses} />

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'expenses'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {activeTab === 'expenses' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ExpenseList
                expenses={filteredExpenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
                loading={loading}
              />
            </div>

            <div className="lg:col-span-1">
              <Filters filters={filters} onFilterChange={setFilters} />
            </div>
          </div>
        ) : (
          <AnalyticsChart expenses={filteredExpenses} />
        )}
      </main>

      <button
        onClick={handleAddExpense}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-200 flex items-center justify-center group z-40"
        aria-label="Add expense"
      >
        <svg
          className="w-8 h-8 transform group-hover:rotate-90 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitExpense}
        editExpense={editingExpense}
      />
    </div>
  );
}

export default App;
