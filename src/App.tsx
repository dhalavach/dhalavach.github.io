import React from 'react';
import { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';
import { useCharacterCache } from './hooks/useCharacterCache';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { CharacterDetails } from './components/CharacterDetails';
import type { Character } from './types/Character';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchCharacters, isLoading, error } = useCharacterCache();
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
    []
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });

  // Get current page from URL params
  const getCurrentPage = () => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  };

  // Update URL params when page changes
  const updateUrlParams = (searchTerm: string, page: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      newParams.set('q', searchTerm.trim());
    } else {
      newParams.delete('q');
    }

    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const handleSearch = useCallback(
    async (searchTerm: string, page?: number) => {
      const currentPage = page ?? getCurrentPage();

      if (!searchTerm.trim()) {
        setDisplayedCharacters([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
        });
        setCurrentSearchTerm('');
        updateUrlParams('', 1);
        return;
      }

      // Don't search if it's the same term and page (unless it's a retry)
      if (
        searchTerm === currentSearchTerm &&
        currentPage === pagination.currentPage &&
        displayedCharacters.length > 0 &&
        !searchError
      ) {
        return;
      }

      setSearchError(null);
      setCurrentSearchTerm(searchTerm);
      updateUrlParams(searchTerm, currentPage);

      try {
        // Use cached search
        const filteredCharacters = await searchCharacters(searchTerm);

        // Implement pagination on filtered results
        const itemsPerPage = 10;
        const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCharacters = filteredCharacters.slice(
          startIndex,
          endIndex
        );

        if (filteredCharacters.length > 0) {
          setDisplayedCharacters(paginatedCharacters);
          setPagination({
            currentPage: currentPage,
            totalPages: totalPages,
            totalCount: filteredCharacters.length,
          });
        } else {
          setDisplayedCharacters([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
          });
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while searching'
        );
        setDisplayedCharacters([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
        });
      }
    },
    [
      searchCharacters,
      currentSearchTerm,
      pagination.currentPage,
      displayedCharacters.length,
      searchError,
      searchParams,
      setSearchParams,
    ]
  );

  const handleRetry = useCallback(() => {
    if (currentSearchTerm) {
      setSearchError(null);
      handleSearch(currentSearchTerm, getCurrentPage());
    }
  }, [currentSearchTerm, handleSearch]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (currentSearchTerm) {
        handleSearch(currentSearchTerm, page);
      }
    },
    [currentSearchTerm, handleSearch]
  );

  // Initialize search from URL params on component mount
  React.useEffect(() => {
    const searchTerm = searchParams.get('q') || '';
    const page = getCurrentPage();

    if (searchTerm) {
      setCurrentSearchTerm(searchTerm);
      handleSearch(searchTerm, page);
    }
  }, []); // Only run on mount
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchSection
        onSearch={(term) => handleSearch(term, 1)}
        isLoading={isLoading}
        initialSearchTerm={searchParams.get('q') || ''}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ResultsSection
              characters={displayedCharacters}
              isLoading={isLoading}
              error={error || searchError}
              onRetry={handleRetry}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route
          path="/character/:id"
          element={
            <CharacterDetails
              characters={displayedCharacters}
              onBack={() => window.history.back()}
            />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
