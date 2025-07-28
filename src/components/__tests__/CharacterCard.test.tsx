import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';
import type { Character } from '../../types/Character';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

const mockOnClick = vi.fn();

describe('CharacterCard', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText(/male.*Born 19BBY.*172cm tall.*77kg/)
    ).toBeInTheDocument();
    expect(screen.getByText('172cm')).toBeInTheDocument();
    expect(screen.getByText('77kg')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('handles unknown values correctly', () => {
    const characterWithUnknowns: Character = {
      ...mockCharacter,
      height: 'unknown',
      mass: 'unknown',
      birth_year: 'unknown',
      gender: 'unknown',
    };

    render(<CharacterCard character={characterWithUnknowns} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    // Should not display unknown values in the description
    expect(screen.queryByText(/unknown/)).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByText('Luke Skywalker').closest('div');
    if (card) {
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
    }
  });

  it('does not call onClick when no onClick prop is provided', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByText('Luke Skywalker').closest('div');
    if (card) {
      fireEvent.click(card);
      // Should not throw an error
    }
  });

  it('displays only available character details', () => {
    const minimalCharacter: Character = {
      ...mockCharacter,
      height: 'unknown',
      mass: 'unknown',
      birth_year: 'unknown',
      gender: 'female',
    };

    render(<CharacterCard character={minimalCharacter} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.queryByText('172cm')).not.toBeInTheDocument();
    expect(screen.queryByText('77kg')).not.toBeInTheDocument();
    expect(screen.queryByText('19BBY')).not.toBeInTheDocument();
  });

  it('renders character avatar', () => {
    render(<CharacterCard character={mockCharacter} />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('handles character with no description details', () => {
    const emptyCharacter: Character = {
      ...mockCharacter,
      gender: 'unknown',
      birth_year: 'unknown',
      height: 'unknown',
      mass: 'unknown',
    };

    render(<CharacterCard character={emptyCharacter} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    // Should still render the card even with no description
    const card = screen.getByText('Luke Skywalker').closest('div');
    expect(card).toBeInTheDocument();
  });

  it('formats description correctly with partial data', () => {
    const partialCharacter: Character = {
      ...mockCharacter,
      mass: 'unknown',
      birth_year: 'unknown',
    };

    render(<CharacterCard character={partialCharacter} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/male.*172cm tall/)).toBeInTheDocument();
    expect(screen.queryByText(/77kg/)).not.toBeInTheDocument();
    expect(screen.queryByText(/19BBY/)).not.toBeInTheDocument();
  });
});
