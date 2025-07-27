import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterDetailsPanel } from '../CharacterDetailsPanel';
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
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  species: [],
  vehicles: ['https://swapi.dev/api/vehicles/14/'],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const mockOnClose = vi.fn();

describe('CharacterDetailsPanel', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when closed', () => {
    const { container } = render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('does not render when no character is provided', () => {
    const { container } = render(
      <CharacterDetailsPanel
        character={null}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders character details when open', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Physical Appearance')).toBeInTheDocument();
    expect(screen.getByText('Associations')).toBeInTheDocument();
  });

  it('displays character attributes correctly', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('172 cm')).toBeInTheDocument();
    expect(screen.getByText('77 kg')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
  });

  it('displays film and vehicle counts', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Appeared in 2 films')).toBeInTheDocument();
    expect(screen.getByText('Used 1 vehicle')).toBeInTheDocument();
    expect(screen.getByText('Piloted 2 starships')).toBeInTheDocument();
  });

  it('handles unknown values correctly', () => {
    const characterWithUnknowns: Character = {
      ...mockCharacter,
      height: 'unknown',
      mass: 'n/a',
      hair_color: 'unknown',
      gender: 'n/a',
    };

    render(
      <CharacterDetailsPanel
        character={characterWithUnknowns}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getAllByText('Unknown')).toHaveLength(4);
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('Close details panel');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked on mobile', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const backdrop = document.querySelector('.fixed.inset-0.bg-black');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('displays creation and edit dates', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Record Information')).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText(/Last edited:/)).toBeInTheDocument();
  });

  it('handles characters with no films or vehicles', () => {
    const minimalCharacter: Character = {
      ...mockCharacter,
      films: [],
      vehicles: [],
      starships: [],
      species: [],
    };

    render(
      <CharacterDetailsPanel
        character={minimalCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/Appeared in/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Used.*vehicle/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Piloted.*starship/)).not.toBeInTheDocument();
  });

  it('shows homeworld information', () => {
    render(
      <CharacterDetailsPanel
        character={mockCharacter}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Known')).toBeInTheDocument();
  });

  it('handles character with no homeworld', () => {
    const characterWithoutHomeworld: Character = {
      ...mockCharacter,
      homeworld: '',
    };

    render(
      <CharacterDetailsPanel
        character={characterWithoutHomeworld}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('displays species information when available', () => {
    const characterWithSpecies: Character = {
      ...mockCharacter,
      species: ['https://swapi.dev/api/species/1/'],
    };

    render(
      <CharacterDetailsPanel
        character={characterWithSpecies}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('1 species association')).toBeInTheDocument();
  });

  it('handles singular vs plural text correctly', () => {
    const characterWithSingleItems: Character = {
      ...mockCharacter,
      films: ['https://swapi.dev/api/films/1/'],
      vehicles: ['https://swapi.dev/api/vehicles/14/'],
      starships: ['https://swapi.dev/api/starships/12/'],
      species: ['https://swapi.dev/api/species/1/'],
    };

    render(
      <CharacterDetailsPanel
        character={characterWithSingleItems}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Appeared in 1 film')).toBeInTheDocument();
    expect(screen.getByText('Used 1 vehicle')).toBeInTheDocument();
    expect(screen.getByText('Piloted 1 starship')).toBeInTheDocument();
    expect(screen.getByText('1 species association')).toBeInTheDocument();
  });
});
