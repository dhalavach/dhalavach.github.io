import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchSection } from '../SearchSection';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOnSearch = vi.fn();

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

describe('SearchSection', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('renders search input and button', () => {
    localStorageMock.getItem.mockReturnValue('');
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByText('Star Wars Character Search')).toBeInTheDocument();
  });

  it('loads saved search term from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('Luke');
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByTestId('search-box') as HTMLInputElement;
    expect(searchInput.value).toBe('Luke');
  });

  it('triggers search on mount with saved search term', async () => {
    localStorageMock.getItem.mockReturnValue('Luke');
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Luke', 1);
    });
  });

  it('updates search term when typing', async () => {
    localStorageMock.getItem.mockReturnValue('');
    const user = userEvent.setup();
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByTestId('search-box');
    await user.type(searchInput, 'Vader');

    expect((searchInput as HTMLInputElement).value).toBe('Vader');
  });

  it('triggers search when clicking search button', async () => {
    localStorageMock.getItem.mockReturnValue('');
    const user = userEvent.setup();
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, 'Vader');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Vader', 1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'starwars-search-term',
      'Vader'
    );
  });

  it('triggers search when pressing Enter', async () => {
    localStorageMock.getItem.mockReturnValue('');
    const user = userEvent.setup();
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByTestId('search-box');
    await user.type(searchInput, 'Leia');
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('Leia', 1);
  });

  it('trims whitespace from search term', async () => {
    localStorageMock.getItem.mockReturnValue('');
    const user = userEvent.setup();
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    await user.type(searchInput, '  Han Solo  ');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Han Solo', 1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'starwars-search-term',
      'Han Solo'
    );
  });

  it('disables input and button when loading', () => {
    localStorageMock.getItem.mockReturnValue('');
    render(<SearchSection onSearch={mockOnSearch} isLoading={true} />);

    const searchInput = screen.getByTestId('search-box');
    const searchButton = screen.getByTestId('search-button');

    expect(searchInput).toBeDisabled();
    expect(searchButton).toBeDisabled();
    expect(searchButton).toHaveTextContent('Searching...');
  });

  it('shows correct button text when not loading', () => {
    localStorageMock.getItem.mockReturnValue('');
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toHaveTextContent('Search');
  });

  it('does not trigger search on mount when no saved term', () => {
    localStorageMock.getItem.mockReturnValue('');
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('handles empty search term correctly', async () => {
    localStorageMock.getItem.mockReturnValue('');
    const user = userEvent.setup();
    render(<SearchSection onSearch={mockOnSearch} isLoading={false} />);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('', 1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'starwars-search-term',
      ''
    );
  });
});
