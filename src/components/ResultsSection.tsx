import type { Character, PaginationInfo } from '../types/Character';
import { CharacterCard } from './CharacterCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Pagination } from './Pagination';

interface Props {
  characters: Character[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onPageChange: (page: number) => void;
  onCharacterClick?: (character: Character) => void;
}

export const ResultsSection = ({
  characters,
  pagination,
  isLoading,
  error,
  onRetry,
  onPageChange,
  onCharacterClick,
}: Props) => {
  return (
    <div className="flex-1 p-6 bg-gray-50 transition-all duration-300">
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
                Search Results
                {pagination && (
                  <span className="text-gray-600 font-normal">
                    {' '}
                    ({pagination.totalCount} character
                    {pagination.totalCount !== 1 ? 's' : ''} found)
                  </span>
                )}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {characters.map((character, index) => (
                <CharacterCard
                  key={`${character.url}-${index}`}
                  character={character}
                  onClick={onCharacterClick}
                />
              ))}
            </div>

            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={onPageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
