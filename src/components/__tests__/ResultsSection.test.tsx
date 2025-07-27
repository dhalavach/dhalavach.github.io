import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultsSection } from '../ResultsSection';
import type { Character } from '../../types/Character';

const mockCharacters: Character[] = [
  {
    uid: '1',
    name: 'Luke Skywalker',
    url: 'https://swapi.tech/api/people/1',
  },
  {
    uid: '2',
    name: 'Darth Vader',
    url: 'https://swapi.tech/api/people/2',
  },
];

const mockPagination = {
  currentPage: 1,
  totalPages: 2,
  totalCount: 15,
};

const mockOnRetry = vi.fn();
const mockOnPageChange = vi.fn();

// Mock the CharacterCard component to avoid complex dependencies
vi.mock('../CharacterCard', () => ({
  CharacterCard: ({ character }: { character: Character }) => (
    <div data-testid={`character-card-${character.uid}`}>{character.name}</div>
  ),
}));

describe('ResultsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', () => {
      render(
        <ResultsSection
          characters={mockCharacters}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByTestId('character-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('character-card-2')).toBeInTheDocument();
      expect(
        screen.getByText('Search Results (15 characters found)')
      ).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
      render(
        <ResultsSection
          characters={[]}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={{ currentPage: 1, totalPages: 1, totalCount: 0 }}
          onPageChange={mockOnPageChange}
        />
      );

      expect(
        screen.getByText('No characters found. Try a different search term.')
      ).toBeInTheDocument();
    });

    it('shows loading state while fetching data', () => {
      render(
        <ResultsSection
          characters={[]}
          isLoading={true}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument(); // Loading spinner
    });

    it('displays pagination information correctly', () => {
      render(
        <ResultsSection
          characters={mockCharacters}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Showing page 1 of 2')).toBeInTheDocument();
    });

    it('handles singular character count correctly', () => {
      render(
        <ResultsSection
          characters={[mockCharacters[0]]}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={{ currentPage: 1, totalPages: 1, totalCount: 1 }}
          onPageChange={mockOnPageChange}
        />
      );

      expect(
        screen.getByText('Search Results (1 character found)')
      ).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays character names', () => {
      render(
        <ResultsSection
          characters={mockCharacters}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    it('handles missing or undefined data gracefully', () => {
      const charactersWithMissingData: Character[] = [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
        },
        {
          uid: '2',
          name: '',
          url: '',
        },
      ];

      render(
        <ResultsSection
          characters={charactersWithMissingData}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByTestId('character-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('character-card-2')).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('displays error message when API call fails', () => {
      const errorMessage = 'Failed to fetch characters';

      render(
        <ResultsSection
          characters={[]}
          isLoading={false}
          error={errorMessage}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('shows appropriate error for different HTTP status codes', () => {
      const httpError = 'HTTP error! status: 500';

      render(
        <ResultsSection
          characters={[]}
          isLoading={false}
          error={httpError}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText(httpError)).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ResultsSection
          characters={[]}
          isLoading={false}
          error="Network error"
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      const retryButton = screen.getByText('Try Again');
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Pagination Tests', () => {
    it('renders pagination controls when there are multiple pages', () => {
      render(
        <ResultsSection
          characters={mockCharacters}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={mockPagination}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('does not render pagination when there is only one page', () => {
      render(
        <ResultsSection
          characters={mockCharacters}
          isLoading={false}
          error={null}
          onRetry={mockOnRetry}
          pagination={{ currentPage: 1, totalPages: 1, totalCount: 2 }}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });
  });
});
