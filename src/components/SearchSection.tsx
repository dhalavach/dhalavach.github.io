import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (searchTerm: string, page?: number) => void;
  isLoading: boolean;
}

const STORAGE_KEY = 'starwars-search-term';

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            data-testid="search-button"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};
