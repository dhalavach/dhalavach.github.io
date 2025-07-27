import type { Character } from '../types/Character.ts';
import { CharacterCard } from './CharacterCard';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { ErrorMessage } from './ErrorMessage.tsx';
import { PaginationControls } from './PaginationControls.tsx';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

interface ResultsSectionProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export const ResultsSection = ({
  characters,
  isLoading,
  error,
  onRetry,
  pagination,
  onPageChange,
}: ResultsSectionProps) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={onRetry} />}

        {!isLoading && !error && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No characters found. Try a different search term.
            </p>
          </div>
        )}

        {!isLoading && !error && characters.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({pagination.totalCount} character
                {pagination.totalCount !== 1 ? 's' : ''} found)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {characters.map((character, index) => (
                <CharacterCard
                  key={`${character.url}-${index}`}
                  character={character}
                />
              ))}
            </div>

            <PaginationControls
              pagination={pagination}
              onPageChange={onPageChange}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};
