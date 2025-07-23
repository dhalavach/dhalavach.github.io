import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockApiResponse = {
  result: [
    {
      properties: {
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
    },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    global.fetch = vi.fn();
  });

  describe('Integration Tests', () => {
    it('renders main application components', () => {
      render(<App />);

      expect(
        screen.getByText('Star Wars Character Search')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Search for Star Wars characters...')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });

    it('makes initial API call on component mount with empty search', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(<App />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://swapi.tech/api/people/?name='
        );
      });
    });

    it('handles search term from localStorage on initial load', async () => {
      const savedTerm = 'Luke';
      localStorage.getItem = vi.fn().mockReturnValue(savedTerm);
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      render(<App />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `https://swapi.tech/api/people/?name=${encodeURIComponent(savedTerm)}`
        );
      });
    });

    it('manages loading states during API calls', async () => {
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      global.fetch = vi.fn().mockReturnValue(promise);

      render(<App />);

      resolvePromise!({
        ok: true,
        json: async () => ({ result: [] }),
      });

      await waitFor(() => {
        expect(
          screen.queryByText('Searching the galaxy...')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('API Integration Tests', () => {
    it('handles successful API responses', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('handles empty API responses', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText('No characters found. Try a different search term.')
        ).toBeInTheDocument();
      });
    });

    it('calls API with correct parameters when searching', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(<App />);

      const input = screen.getByPlaceholderText(
        'Search for Star Wars characters...'
      );
      const button = screen.getByRole('button', { name: 'Search' });

      //await user.clear(input);
      await user.type(input, 'Darth Vader');
      await user.click(button);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://swapi.tech/api/people/?name=Darth%20Vader'
        );
      });
    });
  });

  describe('State Management Tests', () => {
    it('updates component state based on API responses', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText('Search Results (1 character)')
        ).toBeInTheDocument();
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });

    it('manages search term state correctly', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(<App />);

      const input = screen.getByRole('textbox');

      await user.clear(input);
      await user.type(input, 'Yoda');

      expect(input).toHaveValue('Yoda');
    });

    it('handles retry functionality', async () => {
      const user = userEvent.setup();

      global.fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponse,
        });

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });
  });
});
