import { render, screen } from '@testing-library/react';
import { ResultsSection } from '../ResultsSection';
import type { Character, PaginationInfo } from '../../types/Character';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOnRetry = vi.fn();
const mockOnPageChange = vi.fn();
const mockOnCharacterClick = vi.fn();

const mockCharacter: Character = {
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
};

const mockPagination: PaginationInfo = {
  currentPage: 1,
  totalPages: 3,
  totalCount: 25,
  hasNext: true,
  hasPrevious: false,
};

describe('ResultsSection', () => {
  beforeEach(() => {
    mockOnRetry.mockClear();
    mockOnPageChange.mockClear();
    mockOnCharacterClick.mockClear();
  });

  it('shows loading spinner when loading', () => {
    render(
      <ResultsSection
        characters={[]}
        pagination={null}
        isLoading={true}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    render(
      <ResultsSection
        characters={[]}
        pagination={null}
        isLoading={false}
        error="Network error"
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('shows no results message when no characters found', () => {
    render(
      <ResultsSection
        characters={[]}
        pagination={null}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(
      screen.getByText('No characters found. Try a different search term.')
    ).toBeInTheDocument();
  });

  it('renders characters when available', () => {
    render(
      <ResultsSection
        characters={[mockCharacter]}
        pagination={mockPagination}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  it('shows correct character count in header', () => {
    render(
      <ResultsSection
        characters={[mockCharacter]}
        pagination={mockPagination}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('(25 characters found)')).toBeInTheDocument();
  });

  it('shows singular character text when count is 1', () => {
    const singleCharacterPagination = { ...mockPagination, totalCount: 1 };
    render(
      <ResultsSection
        characters={[mockCharacter]}
        pagination={singleCharacterPagination}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('(1 character found)')).toBeInTheDocument();
  });

  it('renders pagination when pagination info is available', () => {
    render(
      <ResultsSection
        characters={[mockCharacter]}
        pagination={mockPagination}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(
      screen.getByText('Showing page 1 of 3 (25 total characters)')
    ).toBeInTheDocument();
  });

  it('does not render pagination when pagination info is null', () => {
    render(
      <ResultsSection
        characters={[mockCharacter]}
        pagination={null}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.queryByText(/Showing page/)).not.toBeInTheDocument();
  });

  it('renders multiple characters correctly', () => {
    const multipleCharacters = [
      mockCharacter,
      {
        ...mockCharacter,
        name: 'Darth Vader',
        url: 'https://swapi.dev/api/people/4/',
      },
    ];

    render(
      <ResultsSection
        characters={multipleCharacters}
        pagination={mockPagination}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('does not show results header when no characters', () => {
    render(
      <ResultsSection
        characters={[]}
        pagination={null}
        isLoading={false}
        error={null}
        onRetry={mockOnRetry}
        onPageChange={mockOnPageChange}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.queryByText('Search Results')).not.toBeInTheDocument();
  });
});
