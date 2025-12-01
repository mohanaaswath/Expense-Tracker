import React from "react";
import { EXPENSE_CATEGORIES } from "../utils/categories";
import { getDateRangePresets } from "../utils/dataHelpers";

const Filters = ({ filters, onFilterChange }) => {
  const datePresets = getDateRangePresets();

  const handlePresetChange = (preset) => {
    onFilterChange({
      ...filters,
      startDate: preset.start.toISOString().split("T")[0],
      endDate: preset.end.toISOString().split("T")[0],
    });
  };

  return (
    <div className="card p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Filters
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              className="input-field"
            >
              <option value="all">All Categories</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(datePresets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handlePresetChange(preset)}
                  className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Date Range
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    onFilterChange({ ...filters, startDate: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    onFilterChange({ ...filters, endDate: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
