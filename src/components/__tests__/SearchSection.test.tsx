import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchSection } from '../SearchSection';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('SearchSection', () => {
  const mockOnSearch = vi.fn();
  const defaultProps = {
    onSearch: mockOnSearch,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<SearchSection {...defaultProps} />);

      expect(
        screen.getByPlaceholderText('Search for Star Wars characters...')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Star Wars Character Search')
      ).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      const savedTerm = 'Luke Skywalker';
      localStorage.getItem = vi.fn().mockReturnValue(savedTerm);

      render(<SearchSection {...defaultProps} />);

      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
      expect(localStorage.getItem).toHaveBeenCalledWith('starwars-search-term');
    });

    it('shows empty input when no saved term exists', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);

      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      expect(input).toHaveValue('');
    });

    it('shows loading state when isLoading is true', () => {
      render(<SearchSection {...defaultProps} isLoading={true} />);

      expect(screen.getByText('Searching...')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      await user.type(input, 'Darth Vader');

      expect(input).toHaveValue('Darth Vader');
    });

    it('triggers search callback when search button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      const button = screen.getByRole('button', { name: 'Search' });

      await user.type(input, 'Luke');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('Luke');
    });

    it('triggers search callback when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );

      await user.type(input, 'Leia');
      await user.keyboard('{Enter}');

      expect(mockOnSearch).toHaveBeenCalledWith('Leia');
    });

    it('trims whitespace from search input before saving', async () => {
      const user = userEvent.setup();
      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      const button = screen.getByRole('button', { name: 'Search' });

      await user.type(input, '  Han Solo  ');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('Han Solo');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'starwars-search-term',
        'Han Solo'
      );
    });
  });

  describe('LocalStorage Integration', () => {
    it('saves search term to localStorage when search is performed', async () => {
      const user = userEvent.setup();
      render(<SearchSection {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      const button = screen.getByRole('button', { name: 'Search' });

      await user.type(input, 'Obi-Wan');
      await user.click(button);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'starwars-search-term',
        'Obi-Wan'
      );
    });

    it('triggers initial search with saved term on mount', () => {
      const savedTerm = 'Yoda';
      localStorage.getItem = vi.fn().mockReturnValue(savedTerm);

      render(<SearchSection {...defaultProps} />);

      expect(mockOnSearch).toHaveBeenCalledWith(savedTerm);
    });

    it('triggers initial search with empty string when no saved term', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);

      render(<SearchSection {...defaultProps} />);

      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });
});
