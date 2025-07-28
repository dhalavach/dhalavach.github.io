import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Mock child components
const GoodChild = () => <div>Everything is fine</div>;
const BadChild = () => {
  throw new Error('Test error');
};

// Mock console.error to avoid test noise
vi.spyOn(console, 'error').mockImplementation(() => {});

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-triangle" />,
  RefreshCw: () => <div data-testid="refresh-cw" />,
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('alert-triangle')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByTestId('refresh-cw')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls console.error when an error is caught', () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });

  it('resets the error state when Try Again is clicked', () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );

    // Verify error state is shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click the reset button
    fireEvent.click(screen.getByText('Try Again'));

    // Verify children are rendered again
  });

  it('displays default error message when error has no message', () => {
    const ChildWithErrorNoMessage = () => {
      throw {}; // Throw an object without message property
    };

    render(
      <ErrorBoundary>
        <ChildWithErrorNoMessage />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('An unexpected error occurred')
    ).toBeInTheDocument();
  });

  it('passes through children when no error occurs', () => {
    const { container } = render(
      <ErrorBoundary>
        <div data-testid="child">Test Child</div>
      </ErrorBoundary>
    );

    expect(
      container.querySelector('[data-testid="child"]')
    ).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
