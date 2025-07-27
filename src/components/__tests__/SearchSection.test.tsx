import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchSection } from '../SearchSection';

// Mock the useCharacterCache hook
vi.mock('../../hooks/useCharacterCache', () => ({
  useCharacterCache: () => ({
    searchCharacters: vi.fn(),
    getDetailedCharacter: vi.fn(),
    isLoading: false,
    error: null,
    characters: [],
    detailedCharacters: new Map(),
    isLoaded: false,
    clearCache: vi.fn(),
  }),
}));

const mockOnSearch = vi.fn();

describe('SearchSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      expect(screen.getByTestId('search-box')).toBeInTheDocument();
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
      expect(
        screen.getByText('Star Wars Character Search')
      ).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      const savedTerm = 'Luke Skywalker';
      localStorage.setItem('starwars-search-term', savedTerm);

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
    });

    it('shows empty input when no saved term exists', () => {
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('disables input and button when loading', () => {
      render(<SearchSection onSearch={mockOnSearch} isLoading={true} />);

      expect(screen.getByTestId('search-box')).toBeDisabled();
      expect(screen.getByTestId('search-button')).toBeDisabled();
      expect(screen.getByText('Searching...')).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      await user.type(input, 'Luke');

      expect(input).toHaveValue('Luke');
    });

    it('saves search term to localStorage when search button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      const button = screen.getByTestId('search-button');

      await user.type(input, 'Luke Skywalker');
      await user.click(button);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'starwars-search-term',
        'Luke Skywalker'
      );
    });

    it('trims whitespace from search input before saving', async () => {
      const user = userEvent.setup();
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      const button = screen.getByTestId('search-button');

      await user.type(input, '  Luke Skywalker  ');
      await user.click(button);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'starwars-search-term',
        'Luke Skywalker'
      );
      expect(mockOnSearch).toHaveBeenCalledWith('Luke Skywalker');
    });

    it('triggers search callback with correct parameters', async () => {
      const user = userEvent.setup();
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      const button = screen.getByTestId('search-button');

      await user.type(input, 'Luke');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('Luke');
    });

    it('triggers search on Enter key press', async () => {
      const user = userEvent.setup();
      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');

      await user.type(input, 'Luke');
      await user.keyboard('{Enter}');

      expect(mockOnSearch).toHaveBeenCalledWith('Luke');
    });

    it('triggers debounced search after typing', async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      await user.type(input, 'Luke');

      // Fast-forward time to trigger debounced search
      vi.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('Luke');
      });

      vi.useRealTimers();
    });
  });

  describe('LocalStorage Integration', () => {
    it('retrieves saved search term on component mount', () => {
      const savedTerm = 'Darth Vader';
      localStorage.setItem('starwars-search-term', savedTerm);

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      expect(localStorage.getItem).toHaveBeenCalledWith('starwars-search-term');
      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
    });

    it('auto-searches with saved term on mount', () => {
      const savedTerm = 'Darth Vader';
      localStorage.setItem('starwars-search-term', savedTerm);

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      expect(mockOnSearch).toHaveBeenCalledWith(savedTerm);
    });

    it('overwrites existing localStorage value when new search is performed', async () => {
      const user = userEvent.setup();
      localStorage.setItem('starwars-search-term', 'old term');

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      const button = screen.getByTestId('search-button');

      await user.clear(input);
      await user.type(input, 'new term');
      await user.click(button);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'starwars-search-term',
        'new term'
      );
    });

    it('removes localStorage item when search term is empty', async () => {
      const user = userEvent.setup();
      localStorage.setItem('starwars-search-term', 'existing term');

      render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

      const input = screen.getByTestId('search-box');
      const button = screen.getByTestId('search-button');

      await user.clear(input);
      await user.click(button);

      expect(localStorage.removeItem).toHaveBeenCalledWith(
        'starwars-search-term'
      );
    });
  });
});
