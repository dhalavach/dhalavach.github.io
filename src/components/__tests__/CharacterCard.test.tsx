import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CharacterCard } from '../CharacterCard.tsx';
import type { Character } from '../../types/Character.ts';
import '@testing-library/jest-dom';

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

describe('CharacterCard', () => {
  describe('Rendering Tests', () => {
    it('displays character name correctly', () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('displays character description with all available data', () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(
        screen.getByText('male • Born 19BBY • 172cm tall • 77kg')
      ).toBeInTheDocument();
    });

    it('displays individual character attributes', () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText('172cm')).toBeInTheDocument();
      expect(screen.getByText('77kg')).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
    });
  });

  describe('Data Handling Tests', () => {
    it('handles missing gender gracefully', () => {
      const characterWithoutGender = { ...mockCharacter, gender: 'unknown' };
      render(<CharacterCard character={characterWithoutGender} />);

      expect(
        screen.getByText('Born 19BBY • 172cm tall • 77kg')
      ).toBeInTheDocument();
    });

    it('handles missing birth year gracefully', () => {
      const characterWithoutBirthYear = {
        ...mockCharacter,
        birth_year: 'unknown',
      };
      render(<CharacterCard character={characterWithoutBirthYear} />);

      expect(screen.getByText('male • 172cm tall • 77kg')).toBeInTheDocument();
    });

    it('handles missing height gracefully', () => {
      const characterWithoutHeight = { ...mockCharacter, height: 'unknown' };
      render(<CharacterCard character={characterWithoutHeight} />);

      expect(screen.getByText('male • Born 19BBY • 77kg')).toBeInTheDocument();
      expect(screen.queryByText('172cm')).not.toBeInTheDocument();
    });

    it('handles missing mass gracefully', () => {
      const characterWithoutMass = { ...mockCharacter, mass: 'unknown' };
      render(<CharacterCard character={characterWithoutMass} />);

      expect(
        screen.getByText('male • Born 19BBY • 172cm tall')
      ).toBeInTheDocument();
      expect(screen.queryByText('77kg')).not.toBeInTheDocument();
    });

    it('handles all unknown values gracefully', () => {
      const characterWithUnknownValues = {
        ...mockCharacter,
        gender: 'unknown',
        birth_year: 'unknown',
        height: 'unknown',
        mass: 'unknown',
      };
      render(<CharacterCard character={characterWithUnknownValues} />);

      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.queryByText(/•/)).not.toBeInTheDocument();
    });

    it('displays only available data when some values are unknown', () => {
      const partialCharacter = {
        ...mockCharacter,
        gender: 'female',
        birth_year: 'unknown',
        height: '150',
        mass: 'unknown',
      };
      render(<CharacterCard character={partialCharacter} />);

      expect(screen.getByText('female • 150cm tall')).toBeInTheDocument();
      expect(screen.getByText('150cm')).toBeInTheDocument();
    });
  });

  describe('Visual Elements Tests', () => {
    it('has proper card styling classes', () => {
      const { container } = render(<CharacterCard character={mockCharacter} />);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
    });

    it('displays gradient avatar background', () => {
      const { container } = render(<CharacterCard character={mockCharacter} />);

      const avatar = container.querySelector('.bg-gradient-to-br');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('from-blue-500', 'to-purple-600');
    });
  });
});
