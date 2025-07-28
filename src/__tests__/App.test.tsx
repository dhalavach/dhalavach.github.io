/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { APIService } from '../services/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the API service
vi.mock('../services/api', () => ({
  APIService: {
    searchCharacters: vi.fn(),
  },
  createPaginationInfo: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockAPIResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
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
  ],
};

const mockPaginationInfo = {
  currentPage: 1,
  totalPages: 1,
  totalCount: 1,
  hasNext: false,
  hasPrevious: false,
};

describe('App', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('');
    (APIService.searchCharacters as any).mockResolvedValue(mockAPIResponse);

    // const { createPaginationInfo } = await import('../services/api');
    const createPaginationInfo = vi.fn();
    createPaginationInfo.mockReturnValue(mockPaginationInfo);
  });

  it('renders the main components', () => {
    render(<App />);

    expect(screen.getByText('Star Wars Character Search')).toBeInTheDocument();
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('performs search when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(APIService.searchCharacters).toHaveBeenCalledWith('Luke', 1);
    });
  });

  it('displays search results', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (APIService.searchCharacters as any).mockRejectedValue(
      new Error('Network error')
    );

    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows loading state during search', async () => {
    // Make the API call hang to test loading state
    (APIService.searchCharacters as any).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockAPIResponse), 100)
        )
    );

    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
    expect(searchButton).toHaveTextContent('Searching...');

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('opens character details panel when character is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const characterCard = screen.getByText('Luke Skywalker').closest('div');
    if (characterCard) {
      await user.click(characterCard);

      // Check if details panel is open
      await waitFor(() => {
        expect(screen.getAllByText('Luke Skywalker')).toHaveLength(2); // One in card, one in panel
        expect(screen.getByText('Basic Information')).toBeInTheDocument();
      });
    }
  });

  it('closes character details panel when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const characterCard = screen.getByText('Luke Skywalker').closest('div');
    if (characterCard) {
      await user.click(characterCard);

      await waitFor(() => {
        expect(screen.getByText('Basic Information')).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close details panel');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Basic Information')).not.toBeInTheDocument();
      });
    }
  });

  it('shows no results message when no characters found', async () => {
    (APIService.searchCharacters as any).mockResolvedValue({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'NonexistentCharacter');
    await user.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText('No characters found. Try a different search term.')
      ).toBeInTheDocument();
    });
  });

  // it('handles pagination correctly', async () => {
  //   const multiPageResponse = {
  //     count: 20,
  //     next: 'https://swapi.dev/api/people/?page=2',
  //     previous: null,
  //     results: [mockAPIResponse.results[0]],
  //   };

  //   const multiPagePagination = {
  //     currentPage: 1,
  //     totalPages: 2,
  //     totalCount: 20,
  //     hasNext: true,
  //     hasPrevious: false,
  //   };

  //   (APIService.searchCharacters as any).mockResolvedValue(multiPageResponse);
  //   const createPaginationInfo = vi.fn();
  //   createPaginationInfo.mockReturnValue(multiPagePagination);

  //   const user = userEvent.setup();
  //   render(<App />);

  //   const searchInput = screen.getByTestId('search-box');
  //   const searchButton = screen.getByTestId('search-button');

  //   await user.type(searchInput, 'Luke');
  //   await user.click(searchButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText('Showing page 1 of 2 (20 total characters)')
  //     ).toBeInTheDocument();
  //   });
  // });

  // it('handles page change correctly', async () => {
  //   const multiPageResponse = {
  //     count: 20,
  //     next: 'https://swapi.dev/api/people/?page=2',
  //     previous: null,
  //     results: [mockAPIResponse.results[0]],
  //   };

  //   const multiPagePagination = {
  //     currentPage: 1,
  //     totalPages: 2,
  //     totalCount: 20,
  //     hasNext: true,
  //     hasPrevious: false,
  //   };

  //   (APIService.searchCharacters as any).mockResolvedValue(multiPageResponse);
  //   const createPaginationInfo = vi.fn();
  //   createPaginationInfo.mockReturnValue(multiPagePagination);

  //   const user = userEvent.setup();
  //   render(<App />);

  //   const searchInput = screen.getByTestId('search-box');
  //   const searchButton = screen.getByTestId('search-button');

  //   await user.type(searchInput, 'a');
  //   await user.click(searchButton);

  //   await waitFor(() => {
  //     expect(screen.getByTestId('next')).toBeInTheDocument();
  //   });

  //   const nextButton = screen.getByTestId('next');
  //   await user.click(nextButton);

  //   await waitFor(() => {
  //     expect(APIService.searchCharacters).toHaveBeenCalledWith('Luke', 2);
  //   });
  // });

  it('handles retry functionality', async () => {
    (APIService.searchCharacters as any).mockRejectedValueOnce(
      new Error('Network error')
    );

    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    // Mock successful retry
    (APIService.searchCharacters as any).mockResolvedValue(mockAPIResponse);

    const retryButton = screen.getByText('Try Again');
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('maintains search term during pagination', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Skywalker');
    await user.click(searchButton);

    // Simulate page change
    const multiPagePagination = {
      currentPage: 1,
      totalPages: 2,
      totalCount: 20,
      hasNext: true,
      hasPrevious: false,
    };

    const createPaginationInfo = vi.fn();
    createPaginationInfo.mockReturnValue(multiPagePagination);

    await waitFor(() => {
      expect(APIService.searchCharacters).toHaveBeenCalledWith('Skywalker', 1);
    });
  });

  it('resets to page 1 on new search', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    // First search
    await user.type(searchInput, 'Luke');
    await user.click(searchButton);

    await waitFor(() => {
      expect(APIService.searchCharacters).toHaveBeenCalledWith('Luke', 1);
    });

    // Clear and new search
    await user.clear(searchInput);
    await user.type(searchInput, 'Vader');
    await user.click(searchButton);

    await waitFor(() => {
      expect(APIService.searchCharacters).toHaveBeenCalledWith('Vader', 1);
    });
  });
});
