import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { CharacterCard } from './components/CharacterCard';
import type { Character } from './types/Character';
import { Bug } from 'lucide-react';

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const handleSearch = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentSearchTerm(searchTerm);

    try {
      const response = await fetch(
        `https://swapi.tech/api/people/?name=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (data.result && data.result.length > 0) {
        setCharacters(
          data.result.map((item: { properties: Character }) => item.properties)
        );
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleRetry = () => {
    handleSearch(currentSearchTerm);
  };

  const throwTestError = () => {
    throw new Error(
      'This is a test error to demonstrate the error boundary functionality'
    );
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SearchSection onSearch={handleSearch} isLoading={isLoading} />

          <Routes>
            <Route
              path="/"
              element={
                <ResultsSection
                  characters={characters}
                  isLoading={isLoading}
                  error={error}
                  onRetry={handleRetry}
                />
              }
            />
            <Route
              path="/character/:id"
              element={<CharacterCard character={characters[0]} />}
            />
          </Routes>

          {/* Error Test Button */}
          <div className="fixed bottom-4 right-4">
            <button
              onClick={throwTestError}
              className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              title="Test Error Boundary"
            >
              <Bug className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
