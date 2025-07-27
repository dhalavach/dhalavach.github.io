import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../test/mocks/server.ts';
import { errorHandlers, rateLimitHandlers } from '../test/mocks/handlers.ts';
import App from '../App';

// Mock the useCharacterCache hook
const mockSearchCharacters = vi.fn();
const mockGetDetailedCharacter = vi.fn();

vi.mock('../hooks/useCharacterCache', () => ({
  useCharacterCache: () => ({
    searchCharacters: mockSearchCharacters,
    getDetailedCharacter: mockGetDetailedCharacter,
    isLoading: false,
    error: null,
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('Integration Tests', () => {
    it('renders search section and results section', () => {
      render(<App />);

      expect(
        screen.getByText('Star Wars Character Search')
      ).toBeInTheDocument();
      expect(screen.getByTestId('search-box')).toBeInTheDocument();
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    it('handles search term from localStorage on initial load', () => {
      const savedTerm = 'Luke Skywalker';
      localStorage.setItem('starwars-search-term', savedTerm);
      mockSearchCharacters.mockResolvedValue([
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
        },
      ]);

      render(<App />);

      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
    });

    it('displays no results message when search returns empty array', async () => {
      mockSearchCharacters.mockResolvedValue([]);

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'NonexistentCharacter');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByText('No characters found. Try a different search term.')
        ).toBeInTheDocument();
      });
    });

    it('manages loading states during search', async () => {
      // Mock a delayed response
      mockSearchCharacters.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
      );

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      // Should show loading state
      expect(searchButton).toBeDisabled();
      expect(screen.getByText('Searching...')).toBeInTheDocument();
    });
  });

  describe('API Integration Tests', () => {
    it('calls searchCharacters with correct parameters', async () => {
      const mockCharacters = [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
        },
      ];
      mockSearchCharacters.mockResolvedValue(mockCharacters);

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      expect(mockSearchCharacters).toHaveBeenCalledWith('Luke');
    });

    it('handles successful API responses', async () => {
      const mockCharacters = [
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
      mockSearchCharacters.mockResolvedValue(mockCharacters);
      mockGetDetailedCharacter.mockResolvedValue({
        properties: {
          name: 'Luke Skywalker',
          gender: 'male',
          birth_year: '19BBY',
        },
      });

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByText('Search Results (2 characters found)')
        ).toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      const errorMessage = 'Network error occurred';
      mockSearchCharacters.mockRejectedValue(new Error(errorMessage));

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it('handles 500 server errors', async () => {
      server.use(...errorHandlers);
      mockSearchCharacters.mockRejectedValue(
        new Error('HTTP error! status: 500')
      );

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText('HTTP error! status: 500')).toBeInTheDocument();
      });
    });

    it('handles 429 rate limit errors', async () => {
      server.use(...rateLimitHandlers);
      mockSearchCharacters.mockRejectedValue(
        new Error('HTTP error! status: 429')
      );

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText('HTTP error! status: 429')).toBeInTheDocument();
      });
    });
  });

  describe('State Management Tests', () => {
    it('updates component state based on API responses', async () => {
      const mockCharacters = [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
        },
      ];
      mockSearchCharacters.mockResolvedValue(mockCharacters);
      mockGetDetailedCharacter.mockResolvedValue({
        properties: {
          name: 'Luke Skywalker',
          gender: 'male',
          birth_year: '19BBY',
        },
      });

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByText('Search Results (1 character found)')
        ).toBeInTheDocument();
      });
    });

    it('manages search term state correctly', async () => {
      mockSearchCharacters.mockResolvedValue([]);

      render(<App />);

      const searchInput = screen.getByTestId('search-box');

      await userEvent.type(searchInput, 'Darth Vader');
      expect(searchInput).toHaveValue('Darth Vader');

      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Luke Skywalker');
      expect(searchInput).toHaveValue('Luke Skywalker');
    });

    it('handles pagination state correctly', async () => {
      // Mock 15 characters to test pagination
      const mockCharacters = Array.from({ length: 15 }, (_, i) => ({
        uid: `${i + 1}`,
        name: `Character ${i + 1}`,
        url: `https://swapi.tech/api/people/${i + 1}`,
      }));

      mockSearchCharacters.mockResolvedValue(mockCharacters);
      mockGetDetailedCharacter.mockResolvedValue({
        properties: {
          name: 'Character',
          gender: 'unknown',
          birth_year: 'unknown',
        },
      });

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Character');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByText('Search Results (15 characters found)')
        ).toBeInTheDocument();
        expect(screen.getByText('Showing page 1 of 2')).toBeInTheDocument();
      });
    });

    it('resets state when search term is cleared', async () => {
      mockSearchCharacters.mockResolvedValue([]);

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      // First search
      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      // Clear search
      await userEvent.clear(searchInput);
      await userEvent.click(searchButton);

      // Should not show results section content
      expect(screen.queryByText('Search Results')).not.toBeInTheDocument();
    });
  });

  describe('Error Recovery Tests', () => {
    it('allows retry after error', async () => {
      // First call fails, second succeeds
      mockSearchCharacters
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce([
          {
            uid: '1',
            name: 'Luke Skywalker',
            url: 'https://swapi.tech/api/people/1',
          },
        ]);

      mockGetDetailedCharacter.mockResolvedValue({
        properties: {
          name: 'Luke Skywalker',
          gender: 'male',
          birth_year: '19BBY',
        },
      });

      render(<App />);

      const searchInput = screen.getByTestId('search-box');
      const searchButton = screen.getByTestId('search-button');

      await userEvent.type(searchInput, 'Luke');
      await userEvent.click(searchButton);

      // Should show error
      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });

      // Click retry
      const retryButton = screen.getByText('Try Again');
      await userEvent.click(retryButton);

      // Should show success
      await waitFor(() => {
        expect(
          screen.getByText('Search Results (1 character found)')
        ).toBeInTheDocument();
      });
    });
  });
});
