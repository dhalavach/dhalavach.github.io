import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
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

  const handleSearch = useCallback(
    async (searchTerm: string, page: number = 1) => {
      if (!searchTerm.trim()) {
        setDisplayedCharacters([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
        });
        setCurrentSearchTerm('');
        return;
      }

      // Don't search if it's the same term and page (unless it's a retry)
      if (
        searchTerm === currentSearchTerm &&
        page === pagination.currentPage &&
        displayedCharacters.length > 0 &&
        !searchError
      ) {
        return;
      }

      setSearchError(null);
      setCurrentSearchTerm(searchTerm);

      try {
        // Use cached search
        const filteredCharacters = await searchCharacters(searchTerm);

        // Implement pagination on filtered results
        const itemsPerPage = 10;
        const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCharacters = filteredCharacters.slice(
          startIndex,
          endIndex
        );

        if (filteredCharacters.length > 0) {
          setDisplayedCharacters(paginatedCharacters);
          setPagination({
            currentPage: page,
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
    ]
  );

  const handleRetry = useCallback(() => {
    if (currentSearchTerm) {
      setSearchError(null);
      handleSearch(currentSearchTerm, pagination.currentPage);
    }
  }, [currentSearchTerm, pagination.currentPage, handleSearch]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (currentSearchTerm) {
        handleSearch(currentSearchTerm, page);
      }
    },
    [currentSearchTerm, handleSearch]
  );

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SearchSection
            onSearch={(term) => handleSearch(term, 1)}
            isLoading={isLoading}
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
      </ErrorBoundary>
    </Router>
  );
}

export default App;
