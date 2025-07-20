import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultsSection } from '../ResultsSection';
import type { Character } from '../../types/Character';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['https://swapi.dev/api/films/1/'],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
    starships: ['https://swapi.dev/api/starships/12/'],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['https://swapi.dev/api/films/1/'],
    species: [],
    vehicles: [],
    starships: ['https://swapi.dev/api/starships/13/'],
    created: '2014-12-10T15:18:20.704000Z',
    edited: '2014-12-20T21:17:50.313000Z',
    url: 'https://swapi.dev/api/people/4/',
  },
];

describe('ResultsSection', () => {
  const mockOnRetry = vi.fn();
  const defaultProps = {
    characters: [],
    isLoading: false,
    error: null,
    onRetry: mockOnRetry,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', () => {
      render(<ResultsSection {...defaultProps} characters={mockCharacters} />);

      expect(
        screen.getByText('Search Results (2 characters)')
      ).toBeInTheDocument();
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    it('displays singular form when only one character', () => {
      render(
        <ResultsSection {...defaultProps} characters={[mockCharacters[0]]} />
      );

      expect(
        screen.getByText('Search Results (1 character)')
      ).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
      render(<ResultsSection {...defaultProps} characters={[]} />);

      expect(
        screen.getByText('No characters found. Try a different search term.')
      ).toBeInTheDocument();
    });

    it('shows loading state while fetching data', () => {
      render(<ResultsSection {...defaultProps} isLoading={true} />);

      expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('displays error message when API call fails', () => {
      const errorMessage = 'Failed to fetch characters';
      render(<ResultsSection {...defaultProps} error={errorMessage} />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();
      const errorMessage = 'Network error';
      render(<ResultsSection {...defaultProps} error={errorMessage} />);

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('State Priority Tests', () => {
    it('shows error state over empty results', () => {
      render(
        <ResultsSection {...defaultProps} error="Some error" characters={[]} />
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByText('No characters found')).not.toBeInTheDocument();
    });

    it('shows results when no loading or error state', () => {
      render(<ResultsSection {...defaultProps} characters={mockCharacters} />);

      expect(
        screen.getByText('Search Results (2 characters)')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Searching the galaxy...')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Something went wrong')
      ).not.toBeInTheDocument();
    });
  });
});
