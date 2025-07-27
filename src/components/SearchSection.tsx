import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash-es';

interface Props {
  onSearch: (searchTerm: string, page?: number) => void;
  isLoading: boolean;
  initialSearchTerm?: string;
}

const STORAGE_KEY = 'starwars-search-term';
const DEBOUNCE_DELAY = 300; // ms - reduced for better responsiveness

export const SearchSection = ({ onSearch, isLoading }: Props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(STORAGE_KEY) || ''
  );

  useEffect(() => {
    // Only trigger search on mount if there's a saved search term
    const savedTerm = localStorage.getItem(STORAGE_KEY);
    if (savedTerm) {
      onSearch(savedTerm, 1);
    }
  }, [onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem(STORAGE_KEY, trimmedTerm);
    onSearch(trimmedTerm, 1); // Always start from page 1 for new searches
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    // Only trigger debounced search after initialization
    if (hasInitialized) {
      debouncedSearch(newValue);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleManualSearch();
    }
  };

  // Initialize component and load saved search term
  useEffect(() => {
    try {
      // Prioritize URL param over localStorage
      const savedTerm =
        initialSearchTerm || localStorage.getItem(STORAGE_KEY) || '';
      setSearchTerm(savedTerm);

      // Auto-search on component mount if there's a saved search term
      if (savedTerm.trim()) {
        onSearch(savedTerm.trim());
      }
    } catch (error) {
      console.warn('Failed to load search term from localStorage:', error);
    }

    setHasInitialized(true);

    return () => {
      debouncedSearch.cancel();
    };
  }, [initialSearchTerm]); // Re-run when initialSearchTerm changes

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Star Wars Character Search
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              data-testid="search-box"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search for Star Wars characters..."
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
          </div>

          <button
            data-testid="search-button"
            onClick={handleManualSearch}
            disabled={isLoading || !searchTerm.trim()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};
